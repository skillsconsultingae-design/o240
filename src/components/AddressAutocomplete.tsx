import { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface Suggestion {
  label: string;      // adresse complete ("5 Rue Boieldieu 91240 Saint-Michel-sur-Orge")
  id: string;
}

// API Adresse (Base Adresse Nationale) — gratuite, sans cle, donnees officielles.
// lat/lon = restaurant (Saint-Michel-sur-Orge) pour prioriser les adresses proches.
const API_ADRESSE = 'https://api-adresse.data.gouv.fr/search/';
const RESTO_LAT = 48.6353;
const RESTO_LON = 2.3072;

async function chercherAdresses(query: string, signal: AbortSignal): Promise<Suggestion[]> {
  const url =
    `${API_ADRESSE}?q=${encodeURIComponent(query)}` +
    `&limit=5&autocomplete=1&lat=${RESTO_LAT}&lon=${RESTO_LON}`;
  const res = await fetch(url, { signal });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.features ?? []).map((f: { properties: { label: string; id: string } }) => ({
    label: f.properties.label,
    id: f.properties.id,
  }));
}

export default function AddressAutocomplete({ value, onChange, placeholder }: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const abortRef = useRef<AbortController | null>(null);
  const skipNextSearch = useRef(false);

  // Recherche debouncee a chaque frappe
  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }
    clearTimeout(debounceRef.current);
    abortRef.current?.abort();

    const query = value.trim();
    if (query.length < 4) {
      setSuggestions([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const results = await chercherAdresses(query, controller.signal);
        setSuggestions(results);
        setOpen(results.length > 0);
        setHighlighted(-1);
      } catch {
        /* requete annulee ou reseau : on ignore */
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [value]);

  // Fermer la liste au clic en dehors
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const choisir = (s: Suggestion) => {
    skipNextSearch.current = true; // ne pas relancer une recherche sur l'adresse choisie
    onChange(s.label);
    setSuggestions([]);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter' && highlighted >= 0) {
      e.preventDefault();
      choisir(suggestions[highlighted]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute left-4 top-[1.375rem] -translate-y-1/2 pointer-events-none">
        {loading ? (
          <Loader2 className="w-4 h-4 text-white/30 animate-spin" />
        ) : (
          <MapPin className="w-4 h-4 text-white/30" />
        )}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:border-brand-500 focus:outline-none transition-colors"
        placeholder={placeholder || 'Recherchez votre adresse...'}
        autoComplete="off"
      />
      {open && (
        <ul className="absolute z-20 mt-2 w-full bg-dark-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
          {suggestions.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()} // garde le focus sur l'input
                onClick={() => choisir(s)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-start gap-2 ${
                  i === highlighted ? 'bg-brand-500/15 text-white' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand-400" />
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
