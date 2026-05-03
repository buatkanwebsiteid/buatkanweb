"use client";

import { useState, useRef, useEffect } from "react";
import { X, Search, Check } from "lucide-react";

const wrapperClass =
  "w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-3 py-2 text-[13px] text-zinc-100 focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500/50 transition-all duration-200";

interface Props {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  placeholder: string;
}

export function MultiSelectDropdown({
  id,
  value,
  onChange,
  options,
  placeholder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const removeTag = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onChange(value.filter((_, i) => i !== index));
  };

  const filteredOptions = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <div
        className={`${wrapperClass} flex flex-wrap gap-1.5 items-center min-h-[44px] cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 && (
          <span className="text-zinc-600 italic px-1 flex-1 select-none">{placeholder}</span>
        )}
        
        {value.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 bg-indigo-600/20 text-indigo-300 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-indigo-500/20"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => removeTag(e, i)}
              className="hover:text-indigo-100 cursor-pointer"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </span>
        ))}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl shadow-black/30 max-h-64 flex flex-col animate-in fade-in slide-in-from-top-1 duration-150 overflow-hidden">
          <div className="flex-shrink-0 p-2 border-b border-zinc-700 relative bg-zinc-800">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            <input 
              id={id}
              ref={searchInputRef}
              type="text" 
              placeholder="Cari..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
          <div className="overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => {
                const isSelected = value.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(item);
                    }}
                    className="w-full text-left px-4 py-2.5 text-[13px] text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{item}</span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-[12px] text-zinc-500 text-center">
                Tidak ada opsi yang cocok
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
