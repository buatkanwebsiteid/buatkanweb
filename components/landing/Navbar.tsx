"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Harga", href: "#harga" },
  { label: "Portofolio", href: "#portofolio" },
];

function UserAvatar({ name, email }: { name?: string; email?: string }) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : email
      ? email[0].toUpperCase()
      : "U";

  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E466B] to-[#67BAF4] flex items-center justify-center text-white text-[12px] font-bold select-none">
      {initials}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, loading, signOut } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name;

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

        {/* Desktop Auth Area */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
          ) : user ? (
            /* Logged in: Avatar + Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer rounded-full hover:ring-2 hover:ring-white/10 transition-all p-0.5"
                aria-label="User menu"
              >
                <UserAvatar name={userName} email={user.email} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-56 bg-[#18181b] border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 py-1.5 animate-fade-in-up" style={{ animationDuration: '0.15s' }}>
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-zinc-800">
                    <p className="text-white text-[13px] font-semibold truncate">{userName || 'User'}</p>
                    <p className="text-zinc-500 text-[12px] truncate">{user.email}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-zinc-300 hover:text-white hover:bg-white/5 text-[13px] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); signOut(); }}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-zinc-300 hover:text-red-400 hover:bg-white/5 text-[13px] transition-colors w-full text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not logged in: Sign In + Sign Up */
            <>
              <Link
                href="/auth/login"
                className="text-zinc-300 hover:text-white text-[13px] font-medium px-4 py-2 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all duration-200"
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                className="bg-[#1E466B] hover:bg-[#1E466B]/80 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#1E466B]/20 hover:shadow-[#1E466B]/30"
              >
                Daftar Gratis
              </Link>
            </>
          )}
        </div>

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

          {!loading && (
            <div className="pt-3 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <UserAvatar name={userName} email={user.email} />
                    <div className="min-w-0">
                      <p className="text-white text-[13px] font-semibold truncate">{userName || 'User'}</p>
                      <p className="text-zinc-500 text-[12px] truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg text-[14px] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { setOpen(false); signOut(); }}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-zinc-300 hover:text-red-400 hover:bg-white/5 rounded-lg text-[14px] transition-colors w-full text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="block text-center py-3 px-3 text-zinc-300 hover:text-white text-[14px] font-medium border border-zinc-700 hover:border-zinc-500 rounded-xl transition-all"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 bg-[#1E466B] text-white text-[14px] font-semibold px-5 py-3 rounded-xl transition-all"
                  >
                    Daftar Gratis
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
