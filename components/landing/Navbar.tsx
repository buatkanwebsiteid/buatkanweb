"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Harga", href: "#harga" },
  { label: "Portofolio", href: "#portofolio" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/Logo buatkanweb.webp"
            alt="BuatkanWeb.id"
            className="w-8 h-8 rounded-lg object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-[15px] tracking-tight text-white">
            BuatkanWeb<span className="text-[#67BAF4]">.id</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/buat"
          className="hidden md:inline-flex items-center gap-2 bg-[#1E466B] hover:bg-[#1E466B]/80 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#1E466B]/20 hover:shadow-[#1E466B]/30"
        >
          Buat Website Gratis
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0D0D0D]/95 backdrop-blur-xl px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 px-3 text-[14px] text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/buat"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 mt-3 bg-[#1E466B] text-white text-[14px] font-semibold px-5 py-3 rounded-xl transition-all"
          >
            Buat Website Gratis
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      )}
    </nav>
  );
}
