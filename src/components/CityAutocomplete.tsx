"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin } from "lucide-react";

interface CityResult {
  city: string;
  state: string;
  country: string;
  display: string;
}

interface Props {
  value: string;
  onChange: (city: string, state: string, country: string) => void;
  placeholder?: string;
}

let debounceTimer: ReturnType<typeof setTimeout>;

export default function CityAutocomplete({ value, onChange, placeholder }: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<CityResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const search = (q: string) => {
    setQuery(q);
    clearTimeout(debounceTimer);
    if (q.length < 2) { setResults([]); setOpen(false); return; }

    debounceTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&addressdetails=1&featuretype=city`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        const cities: CityResult[] = [];
        const seen = new Set<string>();

        for (const item of data) {
          const addr = item.address || {};
          const city = addr.city || addr.town || addr.village || addr.municipality || "";
          const state = addr.state || "";
          const country = addr.country || "";
          if (!city) continue;
          const key = `${city}-${state}-${country}`;
          if (seen.has(key)) continue;
          seen.add(key);

          const parts = [city];
          if (state) parts.push(state);
          if (country) parts.push(country);

          cities.push({ city, state, country, display: parts.join(", ") });
        }
        setResults(cities);
        setOpen(cities.length > 0);
      } catch {
        setResults([]);
      }
      setLoading(false);
    }, 300);
  };

  const select = (r: CityResult) => {
    setQuery(r.city);
    onChange(r.city, r.state, r.country);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => search(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          className="w-full pl-9 pr-4 py-3 bg-background border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
          placeholder={placeholder || "Search for a city..."}
          autoComplete="off"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-20 top-full mt-1 w-full bg-card border border-card-border rounded-lg shadow-lg overflow-hidden">
          {results.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => select(r)}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted-bg transition-colors flex items-center gap-2"
            >
              <MapPin size={14} className="text-muted flex-shrink-0" />
              <span>{r.display}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
