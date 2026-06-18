"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Profil" },
  { href: "/blog", label: "Tulisan" },
  { href: "/contact", label: "Kontak" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup menu saat navigasi
  useEffect(() => { setOpen(false); }, [pathname]);

  // Tutup menu saat scroll
  useEffect(() => {
    const onScroll = () => setOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium tracking-wide transition-colors group ${
                isActive ? "text-gold-600" : "text-dark-600 hover:text-gold-600"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 group"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span className={`block w-5 h-0.5 bg-dark-700 transition-all duration-300 origin-center ${
          open ? "rotate-45 translate-y-2" : ""
        }`} />
        <span className={`block w-5 h-0.5 bg-dark-700 transition-all duration-300 ${
          open ? "opacity-0 scale-x-0" : ""
        }`} />
        <span className={`block w-5 h-0.5 bg-dark-700 transition-all duration-300 origin-center ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`} />
      </button>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-dark-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-700">
          <Link href="/" className="font-serif text-lg font-bold text-white">
            Empu<span className="text-gold-500">written</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="text-dark-400 hover:text-white transition-colors text-xl leading-none"
            aria-label="Tutup menu"
          >
            ✕
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col px-6 py-8 gap-1">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 py-3.5 text-sm font-medium border-b border-dark-700 transition-colors ${
                  isActive ? "text-gold-400" : "text-gray-300 hover:text-gold-400"
                }`}
              >
                <span className={`w-4 h-px transition-all ${isActive ? "bg-gold-500" : "bg-dark-600"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer CTA */}
        <div className="px-6">
          <Link
            href="/contact"
            className="block w-full text-center bg-gold-600 text-white text-xs font-semibold tracking-wider uppercase px-5 py-3 hover:bg-gold-700 transition-colors"
            onClick={() => setOpen(false)}
          >
            Hubungi Saya
          </Link>
        </div>
      </div>
    </>
  );
}
