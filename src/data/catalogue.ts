// ─────────────────────────────────────────────────────────
// O'240 — Source unique de verite pour le catalogue complet
// ─────────────────────────────────────────────────────────

export interface Topping {
  id: string;
  nom: string;
  prix: number;
}

export interface ViandeOption {
  id: string;
  nom: string;
}

export interface SauceOption {
  id: string;
  nom: string;
}

export interface ProduitBase {
  id: string;
  nom: string;
  categorie: string;
  description?: string;
  note?: string;
}

export interface ProduitSimple extends ProduitBase {
  type: 'simple';
  prix: number;
}

export interface ProduitFormule extends ProduitBase {
  type: 'formule';
  prix_seul: number;
  prix_menu: number;
}

export interface ProduitAssiette extends ProduitBase {
  type: 'assiette';
  prix_base: number;
  nb_viandes_max: number;
  supp_boisson: number;
}

export interface ProduitCrepe extends ProduitBase {
  type: 'crepe_sucree';
  prix_base: number;
  toppings_gourmandises: Topping[];
  toppings_fruits: Topping[];
}

export type Produit = ProduitSimple | ProduitFormule | ProduitAssiette | ProduitCrepe;

export interface CategorieMenu {
  id: string;
  nom: string;
  soustitre?: string;
  icone: string;
  produits: Produit[];
}

// ── Viandes pour assiettes ──
export const VIANDES_ASSIETTE: ViandeOption[] = [
  { id: 'cordon_bleu', nom: 'Cordon Bleu' },
  { id: 'tenders', nom: 'Tenders' },
  { id: 'kebab', nom: 'Kebab' },
  { id: 'steak', nom: 'Steak' },
  { id: 'escalope', nom: 'Escalope' },
  { id: 'chicken_tandoori', nom: 'Chicken Tandoori' },
  { id: 'chicken_curry', nom: 'Chicken Curry' },
];

// ── Boissons supplements assiettes (+1.00€) ──
export const BOISSONS_SUPP_ASSIETTE: Topping[] = [
  { id: 'coca', nom: 'Coca-Cola 33cl', prix: 1.00 },
  { id: 'coca_zero', nom: 'Coca-Cola Zero 33cl', prix: 1.00 },
  { id: 'schweppes', nom: 'Schweppes Agrum 33cl', prix: 1.00 },
  { id: 'orangina', nom: 'Orangina 33cl', prix: 1.00 },
  { id: 'fanta_orange', nom: 'Fanta Orange 33cl', prix: 1.00 },
  { id: 'fanta_citron', nom: 'Fanta Citron 33cl', prix: 1.00 },
  { id: 'sprite', nom: 'Sprite 33cl', prix: 1.00 },
  { id: 'icetea', nom: 'Ice Tea 33cl', prix: 1.00 },
  { id: 'oasis', nom: 'Oasis 33cl', prix: 1.00 },
  { id: 'perrier', nom: 'Perrier 33cl', prix: 1.00 },
  { id: 'cristaline', nom: 'Cristaline 33cl', prix: 1.00 },
];

// ── Boissons incluses dans les menus (prix 0, juste le choix) ──
export const BOISSONS_MENU: string[] = [
  'Coca Cola 33cl', 'Coca Cola Zero 33cl', 'Schweppes Agrum 33cl',
  'Orangina 33cl', 'Fanta Orange 33cl', 'Fanta Citron 33cl',
  'Sprite 33cl', 'Ice Tea 33cl', 'Oasis 33cl', 'Perrier 33cl', 'Cristaline 33cl',
];

// ── Sauces offertes ──
export const SAUCES_OFFERTES: SauceOption[] = [
  { id: 'ketchup', nom: 'Ketchup' },
  { id: 'mayo', nom: 'Mayonnaise' },
  { id: 'moutarde', nom: 'Moutarde' },
  { id: 'sauce_burger', nom: 'Sauce Burger' },
  { id: 'sauce_bbq', nom: 'Sauce BBQ' },
  { id: 'sauce_algerienne', nom: 'Sauce Algerienne' },
  { id: 'sauce_harissa', nom: 'Sauce Harissa' },
];

// ── Ingredients Sodip's Compose ──
export const SODIPS_LEGUMES: Topping[] = [
  { id: 'champignons', nom: 'Champignons', prix: 0.50 },
  { id: 'cornichons', nom: 'Cornichons', prix: 0.50 },
  { id: 'oignons_rouges', nom: 'Oignons Rouges', prix: 0.50 },
  { id: 'olives', nom: 'Olives', prix: 0.50 },
  { id: 'poivrons', nom: 'Poivrons', prix: 0.50 },
  { id: 'pommes_de_terre', nom: 'Pommes de Terre', prix: 0.50 },
  { id: 'salade', nom: 'Salade', prix: 0.50 },
  { id: 'tomates', nom: 'Tomates', prix: 0.50 },
];

export const SODIPS_VIANDES: Topping[] = [
  { id: 'bacon', nom: 'Bacon', prix: 1.50 },
  { id: 'chicken_curry_s', nom: 'Chicken Curry', prix: 1.50 },
  { id: 'chicken_tandoori_s', nom: 'Chicken Tandoori', prix: 1.50 },
  { id: 'cordon_bleu_s', nom: 'Cordon Bleu', prix: 1.50 },
  { id: 'escalope_s', nom: 'Escalope', prix: 1.50 },
  { id: 'jambon_dinde', nom: 'Jambon de Dinde', prix: 1.50 },
  { id: 'kebab_s', nom: 'Kebab', prix: 1.50 },
  { id: 'merguez_s', nom: 'Merguez', prix: 1.50 },
  { id: 'nuggets_s', nom: 'Nuggets', prix: 1.50 },
  { id: 'oeuf', nom: 'Oeuf', prix: 0.50 },
  { id: 'saumon_s', nom: 'Saumon', prix: 1.50 },
  { id: 'steak_hache', nom: 'Steak Hache', prix: 1.50 },
  { id: 'tenders_s', nom: 'Tenders', prix: 1.50 },
  { id: 'thon_s', nom: 'Thon', prix: 1.50 },
];

export const SODIPS_FROMAGES: Topping[] = [
  { id: 'boursin_f', nom: 'Boursin', prix: 0.80 },
  { id: 'cheddar_f', nom: 'Cheddar', prix: 0.80 },
  { id: 'chevre_f', nom: 'Chevre', prix: 0.80 },
  { id: 'emmental_f', nom: 'Emmental', prix: 0.80 },
  { id: 'vache_qui_rit', nom: 'La Vache Qui Rit', prix: 0.80 },
  { id: 'raclette_f', nom: 'Raclette', prix: 0.80 },
];

// ── Toppings crepes sucrees ──
const GOURMANDISES: Topping[] = [
  { id: 'daim', nom: 'Daim', prix: 1.00 },
  { id: 'galak', nom: 'Galak', prix: 1.00 },
  { id: 'kinder_bueno', nom: 'Kinder Bueno', prix: 1.00 },
  { id: 'kinder_country', nom: 'Kinder Country', prix: 1.00 },
  { id: 'kinder_schoco', nom: 'Kinder Schoco-Bons', prix: 1.00 },
  { id: 'lion', nom: 'Lion', prix: 1.00 },
  { id: 'lotus', nom: 'Lotus', prix: 1.00 },
  { id: 'mms', nom: "M&M's", prix: 1.00 },
  { id: 'oreo', nom: 'Oreo', prix: 1.00 },
];

const FRUITS: Topping[] = [
  { id: 'banane', nom: 'Banane', prix: 1.50 },
  { id: 'noix_coco', nom: 'Noix de Coco', prix: 1.50 },
];

// ── Options de pain pour sandwichs ──
export interface PainOption {
  id: string;
  nom: string;
  supplement: number;
}

export const PAINS_SANDWICHS: PainOption[] = [
  { id: 'pain_classique', nom: 'Pain classique', supplement: 0 },
  { id: 'tortilla', nom: 'Tortilla', supplement: 0 },
  { id: 'cheese_naan_pain', nom: 'Cheese Naan', supplement: 0.50 },
];

// ── Catalogue complet ──
export const CATALOGUE: CategorieMenu[] = [
  {
    id: 'burgers',
    nom: 'Burgers',
    soustitre: 'Burgers classiques, maison & croques',
    icone: 'Beef',
    produits: [
      { id: 'burger_cheese', nom: 'CHEESE', prix_seul: 5.50, prix_menu: 6.50, categorie: 'burgers', type: 'formule' },
      { id: 'burger_chicken', nom: 'CHICKEN', prix_seul: 6.50, prix_menu: 7.50, categorie: 'burgers', type: 'formule' },
      { id: 'burger_tower', nom: 'TOWER', prix_seul: 7.50, prix_menu: 8.50, categorie: 'burgers', type: 'formule' },
      { id: 'burger_180gr', nom: '180GR', prix_seul: 8.50, prix_menu: 9.50, categorie: 'burgers', type: 'formule' },
      { id: 'burger_double_cheese', nom: 'DOUBLE CHEESE', prix: 8.00, description: '2 steaks 45g, cheddar, crudites', categorie: 'burgers', type: 'simple' },
      { id: 'burger_fish', nom: 'FISH', prix: 7.50, description: 'Poisson pane, cheddar, crudites', categorie: 'burgers', type: 'simple' },
      { id: 'burger_360', nom: 'LE 360', prix: 11.00, description: '2 steaks 180, cheddar, crudites', categorie: 'burgers', type: 'simple' },
      { id: 'burger_540', nom: 'LE 540', prix: 12.50, description: '3 steaks 180, cheddar, crudites', categorie: 'burgers', type: 'simple' },
      { id: 'burger_big_m', nom: 'LE BIG M', prix: 8.50, description: '2 steaks 45g, cheddar, crudites', categorie: 'burgers', type: 'simple' },
      { id: 'burger_chikn_steak', nom: "CHIK'N STEAK", prix: 8.50, description: '1 steak 45g, tenders, oeuf, cheddar, crudites', categorie: 'burgers', type: 'simple' },
      { id: 'burger_naan', nom: 'NAAN BURGER', prix: 11.00, description: '2 pains naan, 2 steaks 90g, cheddar, crudites', categorie: 'burgers', type: 'simple' },
      { id: 'gourmet', nom: 'LE GOURMET', prix: 12.50, categorie: 'burgers', type: 'simple' },
      { id: 'french', nom: 'LE FRENCH', prix: 12.50, categorie: 'burgers', type: 'simple' },
      { id: 'montagnard', nom: 'LE MONTAGNARD', prix: 12.50, categorie: 'burgers', type: 'simple' },
      { id: 'chevre_miel', nom: 'CHEVRE MIEL', prix: 12.50, categorie: 'burgers', type: 'simple' },
      { id: 'croque_simple', nom: 'CROQUE MR', prix_seul: 5.50, prix_menu: 6.50, categorie: 'burgers', type: 'formule' },
      { id: 'croque_special', nom: 'CROQUE SPECIAL', prix_seul: 6.50, prix_menu: 7.50, categorie: 'burgers', type: 'formule' },
    ],
  },
  {
    id: 'sandwichs',
    nom: 'Sandwichs',
    soustitre: 'Menu avec frites & boisson',
    icone: 'Sandwich',
    produits: [
      { id: 'sand_vege', nom: 'VEGE', prix_seul: 7.50, prix_menu: 8.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_grec', nom: 'GREC', prix_seul: 7.50, prix_menu: 8.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_curry', nom: 'CURRY', prix_seul: 7.50, prix_menu: 8.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_tandoori', nom: 'TANDOORI', prix_seul: 7.50, prix_menu: 8.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_boursin', nom: 'BOURSIN', prix_seul: 8.00, prix_menu: 9.00, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_tenders', nom: 'TENDERS', prix_seul: 8.00, prix_menu: 9.00, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_brabus', nom: 'BRABUS', prix_seul: 8.00, prix_menu: 9.00, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_phenomene', nom: 'PHENOMENE', prix_seul: 8.00, prix_menu: 9.00, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_suisse', nom: 'SUISSE', prix_seul: 8.00, prix_menu: 9.00, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_amg', nom: 'AMG', prix_seul: 8.50, prix_menu: 9.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_tenders_steak', nom: 'TENDERS STEAK', prix_seul: 8.50, prix_menu: 9.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_special', nom: 'LE SPECIAL', prix_seul: 8.50, prix_menu: 9.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_crousty', nom: 'CROUSTY', prix_seul: 8.50, prix_menu: 9.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_panamera', nom: 'PANAMERA', prix_seul: 8.50, prix_menu: 9.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_240', nom: '240', prix_seul: 8.50, prix_menu: 9.50, categorie: 'sandwichs', type: 'formule' },
      { id: 'sand_savoyard', nom: 'SAVOYARD', prix_seul: 8.50, prix_menu: 9.50, categorie: 'sandwichs', type: 'formule' },
    ],
  },
  {
    id: 'tex_mex',
    nom: 'Tex Mex',
    soustitre: 'Tenders, wings, buckets & a la carte',
    icone: 'Drumstick',
    produits: [
      { id: 'texmex_tenders', nom: '6 TENDERS', prix_seul: 8.50, prix_menu: 9.50, categorie: 'tex_mex', type: 'formule' },
      { id: 'texmex_wings', nom: '9 CHICKEN WINGS', prix_seul: 8.50, prix_menu: 9.50, categorie: 'tex_mex', type: 'formule' },
      { id: 'texmex_nuggets', nom: '9 NUGGETS', prix_seul: 8.50, prix_menu: 9.50, categorie: 'tex_mex', type: 'formule' },
      { id: 'bucket_tenders', nom: 'BUCKET TENDERS', prix: 21.90, categorie: 'tex_mex', type: 'simple' },
      { id: 'bucket_wings', nom: 'BUCKET WINGS', prix: 22.90, categorie: 'tex_mex', type: 'simple' },
      { id: 'bucket_mix', nom: 'BUCKET MIX', prix: 25.90, categorie: 'tex_mex', type: 'simple' },
      { id: 'mozza_4', nom: '4 MOZZA STICKS', prix: 3.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'mozza_6', nom: '6 MOZZA STICKS', prix: 4.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'camembert_4', nom: '4 BOUCHEES DE CAMEMBERT', prix: 3.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'camembert_6', nom: '6 BOUCHEES DE CAMEMBERT', prix: 4.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'jalapenos_4', nom: '4 JALAPENOS', prix: 3.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'jalapenos_6', nom: '6 JALAPENOS', prix: 4.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'nuggets_4', nom: '4 NUGGETS', prix: 3.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'nuggets_6', nom: '6 NUGGETS', prix: 5.00, categorie: 'tex_mex', type: 'simple' },
      { id: 'frites_petite', nom: 'PETITE FRITES', prix: 2.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'frites_grande', nom: 'GRANDE FRITES', prix: 3.00, categorie: 'tex_mex', type: 'simple' },
      { id: 'frites_cheddar_petite', nom: 'PETITE FRITES CHEDDAR BACON', prix: 3.50, categorie: 'tex_mex', type: 'simple' },
      { id: 'frites_cheddar_grande', nom: 'GRANDE FRITES CHEDDAR BACON', prix: 5.00, categorie: 'tex_mex', type: 'simple' },
      { id: 'cheese_naan', nom: 'CHEESE NAAN', prix: 3.00, categorie: 'tex_mex', type: 'simple' },
    ],
  },
  {
    id: 'menus_enfant',
    nom: 'Menus Enfant',
    icone: 'Baby',
    produits: [
      { id: 'enfant_cheese', nom: 'CHEESE', prix: 5.50, description: 'Cheese burger + frites + Capri-Sun', categorie: 'menus_enfant', type: 'simple' },
      { id: 'enfant_texmex', nom: 'TEX MEX', prix: 5.50, description: 'Tenders + frites + Capri-Sun', categorie: 'menus_enfant', type: 'simple' },
    ],
  },
  {
    id: 'paninis',
    nom: 'Paninis',
    soustitre: 'Menu avec frites & boisson',
    icone: 'Pizza',
    produits: [
      { id: 'panini_hachee', nom: 'VIANDE HACHEE', prix_seul: 5.50, prix_menu: 6.50, categorie: 'paninis', type: 'formule' },
      { id: 'panini_poulet', nom: 'POULET', prix_seul: 5.50, prix_menu: 6.50, categorie: 'paninis', type: 'formule' },
      { id: 'panini_thon', nom: 'THON', prix_seul: 5.50, prix_menu: 6.50, categorie: 'paninis', type: 'formule' },
      { id: 'panini_fromages', nom: 'FROMAGES', prix_seul: 5.50, prix_menu: 6.50, categorie: 'paninis', type: 'formule' },
      { id: 'panini_jambon', nom: 'JAMBON', prix_seul: 5.50, prix_menu: 6.50, categorie: 'paninis', type: 'formule' },
      { id: 'panini_merguez', nom: 'MERGUEZ', prix_seul: 5.50, prix_menu: 6.50, categorie: 'paninis', type: 'formule' },
      { id: 'panini_saumon', nom: 'SAUMON', prix_seul: 5.50, prix_menu: 6.50, categorie: 'paninis', type: 'formule' },
    ],
  },
  {
    id: 'assiettes',
    nom: 'Assiettes',
    icone: 'UtensilsCrossed',
    produits: [
      { id: 'assiette_1', nom: '1 VIANDE', prix_base: 8.90, nb_viandes_max: 1, supp_boisson: 1.00, categorie: 'assiettes', type: 'assiette' },
      { id: 'assiette_2', nom: '2 VIANDES', prix_base: 9.90, nb_viandes_max: 2, supp_boisson: 1.00, categorie: 'assiettes', type: 'assiette' },
    ],
  },
  {
    id: 'sodips',
    nom: "Sodip's",
    icone: 'Star',
    produits: [
      { id: 'sodip_compose', nom: "COMPOSEZ VOTRE SODIP'S", prix: 5.50, categorie: 'sodips', type: 'simple' },
      { id: 'sodip_steak', nom: 'STEAK', prix: 9.00, categorie: 'sodips', type: 'simple' },
      { id: 'sodip_crousty', nom: 'CROUSTY', prix: 10.00, categorie: 'sodips', type: 'simple' },
    ],
  },
  {
    id: 'salades',
    nom: 'Salades',
    soustitre: 'Servie avec pain Naan',
    icone: 'Salad',
    produits: [
      { id: 'salade_chicken', nom: 'CHICKEN', prix: 7.50, note: 'Servie avec pain Naan', categorie: 'salades', type: 'simple' },
      { id: 'salade_tenders', nom: 'TENDERS', prix: 7.50, note: 'Servie avec pain Naan', categorie: 'salades', type: 'simple' },
      { id: 'salade_thon', nom: 'THON', prix: 7.50, note: 'Servie avec pain Naan', categorie: 'salades', type: 'simple' },
      { id: 'salade_nordique', nom: 'NORDIQUE', prix: 8.00, note: 'Servie avec pain Naan', categorie: 'salades', type: 'simple' },
    ],
  },
  {
    id: 'crepes_salees',
    nom: 'Crepes Salees',
    icone: 'CircleDot',
    produits: [
      { id: 'crepe_parisienne', nom: 'LA PARISIENNE', prix: 8.00, categorie: 'crepes_salees', type: 'simple' },
      { id: 'crepe_chicken', nom: 'CHICKEN', prix: 9.00, categorie: 'crepes_salees', type: 'simple' },
      { id: 'crepe_frenchy', nom: 'FRENCHY', prix: 9.00, categorie: 'crepes_salees', type: 'simple' },
      { id: 'crepe_compose', nom: 'COMPOSEZ VOTRE CREPE', prix: 5.00, categorie: 'crepes_salees', type: 'simple' },
    ],
  },
  {
    id: 'desserts',
    nom: 'Desserts',
    icone: 'Cake',
    produits: [
      {
        id: 'crepe_sucree',
        nom: 'CREPE SUCREE (Composez)',
        prix_base: 3.50,
        categorie: 'desserts',
        type: 'crepe_sucree',
        toppings_gourmandises: GOURMANDISES,
        toppings_fruits: FRUITS,
      },
      { id: 'tarte_daims', nom: 'TARTE AUX DAIMS', prix: 2.50, note: 'La tarte decongelee ne doit pas etre recongelee', categorie: 'desserts', type: 'simple' },
      { id: 'tiramisu', nom: 'TIRAMISU', prix: 3.00, categorie: 'desserts', type: 'simple' },
    ],
  },
  {
    id: 'boissons',
    nom: 'Boissons',
    icone: 'GlassWater',
    produits: [
      { id: 'coca_33', nom: 'COCA COLA 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'coca_zero_33', nom: 'COCA COLA ZERO 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'schweppes_33', nom: 'SCHWEPPES AGRUM 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'orangina_33', nom: 'ORANGINA 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'fanta_orange_33', nom: 'FANTA ORANGE 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'fanta_citron_33', nom: 'FANTA CITRON 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'sprite_33', nom: 'SPRITE 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'icetea_33', nom: 'ICE TEA 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'oasis_33', nom: 'OASIS 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'perrier_33', nom: 'PERRIER 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'cristaline_33', nom: 'CRISTALINE 33CL', prix: 1.50, categorie: 'boissons', type: 'simple' },
      { id: 'coca_125', nom: 'COCA COLA 1.25L', prix: 3.00, categorie: 'boissons', type: 'simple' },
      { id: 'orangina_15', nom: 'ORANGINA 1.5L', prix: 3.00, categorie: 'boissons', type: 'simple' },
      { id: 'icetea_15', nom: 'ICE TEA 1.5L', prix: 3.00, categorie: 'boissons', type: 'simple' },
      { id: 'oasis_2', nom: 'OASIS 2L', prix: 3.50, categorie: 'boissons', type: 'simple' },
    ],
  },
];

// ── Helpers ──

export function findProduit(id: string): Produit | undefined {
  for (const cat of CATALOGUE) {
    const found = cat.produits.find((p) => p.id === id);
    if (found) return found;
  }
  return undefined;
}

export function findCategorie(id: string): CategorieMenu | undefined {
  return CATALOGUE.find((c) => c.id === id);
}

export function getPrixAffichage(produit: Produit): number {
  switch (produit.type) {
    case 'simple':
      return produit.prix;
    case 'formule':
      return produit.prix_seul;
    case 'assiette':
      return produit.prix_base;
    case 'crepe_sucree':
      return produit.prix_base;
  }
}

export function needsConfigurator(produit: Produit): boolean {
  if (produit.type !== 'simple') return true;
  if (['burgers', 'sodips'].includes(produit.categorie)) return true;
  return false;
}

// ── Zones de livraison ──
export const ZONES_LIVRAISON = [
  { zone: 'Saint-Michel-sur-Orge 91240', minimum: 10 },
  { zone: 'Bretigny-sur-Orge 91220, Ste-Genevieve-des-Bois 91700', minimum: 15 },
  { zone: 'Bondoufle, Fleury-Merogis, Le Plessis-Pate, Linas, Longpont-sur-Orge, Montlhery, Villiers-sur-Orge', minimum: 20 },
  { zone: 'Arpajon, Ballainvilliers, La Ville-du-Bois, Marcoussis, Nozay, St-Germain-les-Arpajons, Villemoisson-sur-Orge', minimum: 25 },
];
