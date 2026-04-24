"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const inputClass =
  "w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-[13px] text-zinc-100 placeholder:text-zinc-600 placeholder:italic focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all duration-200";

interface Props {
  id: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder: string;
}

export function AutocompleteInput({
  id,
  value,
  onChange,
  suggestions,
  placeholder,
}: Props) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = query.trim()
    ? suggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    : suggestions;

  const handleSelect = (item: string) => {
    setQuery(item);
    onChange(item);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        const exact = filtered.find(
          (s) => s.toLowerCase() === query.toLowerCase()
        );
        handleSelect(exact || query.trim());
      }
    }
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <input
          id={id}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${inputClass} pr-9`}
        />
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1.5 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl shadow-black/30 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
          {filtered.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSelect(item)}
              className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl ${
                item === value
                  ? "bg-indigo-600/15 text-indigo-300"
                  : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
