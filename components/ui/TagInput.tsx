"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const wrapperClass =
  "w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-3 py-2 text-[13px] text-zinc-100 focus-within:ring-2 focus-within:ring-indigo-500/40 focus-within:border-indigo-500/50 transition-all duration-200";

export interface SuggestionGroup {
  category?: string;
  items: string[];
}

interface Props {
  id: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions: SuggestionGroup[];
  placeholder: string;
}

export function AutocompleteTagInput({
  id,
  tags,
  onChange,
  suggestions,
  placeholder,
}: Props) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInput("");
    inputRef.current?.focus();
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) addTag(input.trim());
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      removeTag(tags.length - 1);
    }
    if (e.key === "Escape") setIsOpen(false);
  };

  const filteredGroups = suggestions
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          !tags.includes(item) &&
          (!input.trim() ||
            item.toLowerCase().includes(input.toLowerCase()))
      ),
    }))
    .filter((group) => group.items.length > 0);

  const hasResults = filteredGroups.length > 0;

  return (
    <div ref={ref}>
      <div className="relative">
        <div
          className={`${wrapperClass} flex flex-wrap gap-1.5 items-center min-h-[44px] cursor-text`}
          onClick={() => inputRef.current?.focus()}
        >
          {tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="inline-flex items-center gap-1 bg-indigo-600/20 text-indigo-300 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-indigo-500/20"
            >
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(i);
                }}
                className="hover:text-indigo-100 cursor-pointer"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : "Tambah lagi..."}
            className="flex-1 min-w-[120px] bg-transparent text-[13px] text-zinc-100 placeholder:text-zinc-600 placeholder:italic focus:outline-none py-1"
          />
        </div>

        {isOpen && hasResults && (
          <div className="absolute z-50 w-full mt-1.5 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl shadow-black/30 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
            {filteredGroups.map((group, gi) => (
              <div key={group.category || `group-${gi}`}>
                {group.category && (
                  <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider select-none">
                    {group.category}
                  </p>
                )}
                {group.items.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => addTag(item)}
                    className="w-full text-left px-4 py-2 text-[13px] text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="text-zinc-600 text-[11px] mt-1.5">
        Ketik lalu tekan{" "}
        <kbd className="text-zinc-500 bg-zinc-800 px-1 rounded text-[10px]">
          Enter
        </kbd>{" "}
        untuk menambahkan, atau pilih dari saran
      </p>
    </div>
  );
}
