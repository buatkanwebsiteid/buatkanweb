"use client";

import { useState, useRef, useEffect } from "react";
import { KOTA_INDONESIA } from "@/data/kota-indonesia";
import { MapPin, X, Search } from "lucide-react";

const inputClass =
  "w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-[13px] text-zinc-100 placeholder:text-zinc-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all duration-200";

export function SearchableCombobox({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? KOTA_INDONESIA.filter((k) =>
        k.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12)
    : KOTA_INDONESIA.slice(0, 12);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
        <input
          id="input-lokasi"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            if (!e.target.value) onChange("");
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Ketik untuk mencari kota..."
          className={`${inputClass} pl-9`}
        />
        {value && (
          <button
            type="button"
            onClick={() => { setQuery(""); onChange(""); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl shadow-black/20 max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-[12px] text-zinc-500">
              Tidak ditemukan kota &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((kota) => (
              <button
                key={kota}
                type="button"
                onClick={() => { setQuery(kota); onChange(kota); setIsOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors cursor-pointer ${
                  kota === value ? "bg-indigo-600/15 text-indigo-300" : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <MapPin className="inline w-3 h-3 mr-2 text-zinc-500" />
                {kota}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
