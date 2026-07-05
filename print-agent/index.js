import 'dotenv/config';
import { spawn } from 'node:child_process';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PS_SCRIPT = join(__dirname, 'print-raw.ps1');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const {
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  PRINTER_NAME = 'EPSON TM-T20II Receipt',
  RESTO_NOM = 'RESTAURANT',
  RESTO_ADRESSE = '',
  RESTO_TEL = '',
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('[config] SUPABASE_URL et SUPABASE_SERVICE_KEY sont obligatoires (voir .env).');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

// ---------------------------------------------------------------------------
// Imprimante — TM-T20II en 80 mm
// ---------------------------------------------------------------------------
// On NE se connecte PAS a l'imprimante via node-thermal-printer (son interface
// "printer:" reclame un module natif a compiler sous Windows = galere). A la
// place : on construit le ticket ESC/POS en memoire (getBuffer), puis on envoie
// les octets bruts a l'imprimante Windows via print-raw.ps1 (API winspool).
// L'interface ci-dessous est donc fictive : on n'ouvre jamais ce socket.
function makePrinter() {
  return new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'tcp://localhost',         // fictif : jamais connecte, on lit getBuffer()
    width: 48,                            // 80 mm, Font A = 48 caracteres
    characterSet: 'WPC1252',              // Latin-1 -> accents FR corrects (a modifier si soucis)
    removeSpecialCharacters: false,
    options: { timeout: 5000 },
  });
}

// Envoie un buffer ESC/POS brut a l'imprimante Windows via print-raw.ps1.
let __jobSeq = 0;
async function envoyerBrut(buffer) {
  const tmpFile = join(tmpdir(), `resto-ticket-${process.pid}-${__jobSeq++}.bin`);
  await writeFile(tmpFile, buffer);
  try {
    await new Promise((resolve, reject) => {
      const ps = spawn(
        'powershell.exe',
        [
          '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
          '-File', PS_SCRIPT,
          '-PrinterName', PRINTER_NAME,
          '-FilePath', tmpFile,
        ],
        { windowsHide: true },
      );
      let stderr = '';
      ps.stderr.on('data', (d) => { stderr += d.toString(); });
      ps.on('error', reject); // ex: powershell.exe introuvable
      ps.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(stderr.trim() || `PowerShell a renvoye le code ${code}`));
      });
    });
  } finally {
    await unlink(tmpFile).catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// Helpers de formatage
// ---------------------------------------------------------------------------
const euros = (centimes) =>
  (Number(centimes || 0) / 100).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' EUR'; // "EUR" est plus fiable que le symbole sur bcp d'imprimantes thermiques

function dateHeure(iso) {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

// ---------------------------------------------------------------------------
// Impression d'un ticket CLIENT (avec prix + total)
// ---------------------------------------------------------------------------
async function imprimerTicket(commande, lignes) {
  const printer = makePrinter();

  // --- En-tete resto ---
  printer.alignCenter();
  printer.bold(true);
  printer.setTextDoubleHeight();
  printer.println(RESTO_NOM);
  printer.setTextNormal();
  printer.bold(false);
  if (RESTO_ADRESSE) printer.println(RESTO_ADRESSE);
  if (RESTO_TEL) printer.println('Tel : ' + RESTO_TEL);
  printer.newLine();

  // --- Infos commande ---
  printer.alignLeft();
  printer.println(`Commande #${commande.numero ?? commande.id?.slice(0, 8) ?? '-'}`);
  printer.println(dateHeure(commande.created_at));
  if (commande.mode) {
    printer.bold(true);
    printer.println(commande.mode === 'delivery' ? '>> LIVRAISON' : '>> A EMPORTER');
    printer.bold(false);
  }
  if (commande.table_num) printer.println(`Table : ${commande.table_num}`);
  if (commande.client_nom) printer.println(`Client : ${commande.client_nom}`);
  if (commande.client_tel) printer.println(`Tel : ${commande.client_tel}`);
  if (commande.adresse) printer.println(`Adr : ${commande.adresse}`);
  printer.drawLine();

  // --- Lignes (article a gauche, prix a droite) ---
  let totalCalc = 0;
  for (const l of lignes) {
    const sousTotal = Number(l.prix_centimes || 0) * Number(l.quantite || 0);
    totalCalc += sousTotal;
    printer.tableCustom([
      { text: `${l.quantite}x ${l.nom}`, align: 'LEFT', width: 0.68 },
      { text: euros(sousTotal), align: 'RIGHT', width: 0.32 },
    ]);
  }
  printer.drawLine();

  // --- Total (celui de la commande si present, sinon calcule) ---
  const total = commande.total_centimes ?? totalCalc;
  printer.bold(true);
  printer.setTextDoubleHeight();
  printer.tableCustom([
    { text: 'TOTAL', align: 'LEFT', width: 0.5 },
    { text: euros(total), align: 'RIGHT', width: 0.5 },
  ]);
  printer.setTextNormal();
  printer.bold(false);

  // --- Note eventuelle ---
  if (commande.notes) {
    printer.newLine();
    printer.println('Note : ' + commande.notes);
  }

  // --- Pied de ticket ---
  printer.newLine();
  printer.alignCenter();
  printer.println('Merci de votre visite !');
  printer.newLine();
  printer.cut();

  await envoyerBrut(printer.getBuffer()); // octets ESC/POS -> imprimante Windows (winspool)
}

// ---------------------------------------------------------------------------
// Traitement d'un job d'impression
// ---------------------------------------------------------------------------
async function traiterJob(job) {
  try {
    const { data: commande, error: e1 } = await supabase
      .from('commandes').select('*').eq('id', job.commande_id).single();
    if (e1) throw e1;

    const { data: lignes, error: e2 } = await supabase
      .from('commande_lignes').select('*').eq('commande_id', job.commande_id);
    if (e2) throw e2;

    await imprimerTicket(commande, lignes ?? []);

    await supabase.from('impressions').update({ statut: 'imprimee' }).eq('id', job.id);
    await supabase.from('commandes').update({ statut: 'imprimee' }).eq('id', job.commande_id);

    console.log(`[ok] Ticket imprime — commande #${commande.numero ?? commande.id}`);
  } catch (e) {
    console.error(`[erreur] Job ${job?.id} : ${e.message}`);
    await supabase.from('impressions')
      .update({ statut: 'erreur', erreur: String(e.message).slice(0, 500) })
      .eq('id', job.id);
  }
}

// ---------------------------------------------------------------------------
// Rattrapage : jobs restes "en_attente" (agent eteint, panne, etc.)
// ---------------------------------------------------------------------------
async function rattrapage() {
  const { data, error } = await supabase
    .from('impressions')
    .select('*')
    .eq('statut', 'en_attente')
    .order('created_at', { ascending: true });
  if (error) { console.error('[rattrapage]', error.message); return; }
  if (data?.length) {
    console.log(`[rattrapage] ${data.length} impression(s) en attente...`);
    for (const job of data) await traiterJob(job);
  }
}

// ---------------------------------------------------------------------------
// Ecoute temps reel des nouveaux jobs d'impression
// ---------------------------------------------------------------------------
function ecouter() {
  const channel = supabase
    .channel('agent-impression')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'impressions', filter: 'statut=eq.en_attente' },
      (payload) => {
        console.log(`[realtime] Nouveau job d'impression : ${payload.new.id}`);
        traiterJob(payload.new);
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') console.log('[realtime] Connecte, en attente de commandes.');
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        console.warn(`[realtime] Deconnecte (${status}), reconnexion dans 5 s...`);
        supabase.removeChannel(channel);
        setTimeout(ecouter, 5000);
      }
    });
}

// ---------------------------------------------------------------------------
// Ticket de test : node index.js --test
// ---------------------------------------------------------------------------
async function ticketTest() {
  console.log('[test] Impression d\'un ticket de demonstration...');
  await imprimerTicket(
    {
      numero: 'TEST', created_at: new Date().toISOString(),
      table_num: '5', client_nom: 'Demo', total_centimes: 2150, notes: 'Sans oignons',
    },
    [
      { nom: 'Burger maison', quantite: 2, prix_centimes: 850 },
      { nom: 'Frites', quantite: 1, prix_centimes: 450 },
    ]
  );
  console.log('[test] Termine. Le ticket est-il sorti correctement ?');
}

// ---------------------------------------------------------------------------
// Demarrage
// ---------------------------------------------------------------------------
async function main() {
  if (process.argv.includes('--test')) {
    await ticketTest();
    process.exit(0);
  }
  console.log(`[start] Agent d'impression demarre — imprimante "${PRINTER_NAME}"`);
  await rattrapage();
  ecouter();
}

main().catch((e) => {
  console.error('[fatal]', e);
  process.exit(1);
});
