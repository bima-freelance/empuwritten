import Link from "next/link";
import Image from "next/image";
import Nav from "./Nav";

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark-900 text-gray-400 text-xs">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="mailto:bagusdananjaya1@gmail.com"
              className="hover:text-gold-400 transition-colors"
            >
              bagusdananjaya1@gmail.com
            </a>
            <span className="hidden sm:inline text-dark-600">|</span>
            <a
              href="tel:+6282337331331"
              className="hidden sm:inline hover:text-gold-400 transition-colors"
            >
              +62 823-3733-****
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            {[
              { label: "Instagram", char: "Ig", href: "https://www.instagram.com/tubagusgallery" },
              { label: "TikTok", char: "Tk", href: "https://www.tiktok.com/@tubagusgallery" },
              { label: "Facebook", char: "Fb", href: "https://www.facebook.com/tubagus.dananjaya.9" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-dark-700 hover:text-gold-400 transition-colors text-[10px] font-semibold"
                aria-label={s.label}
              >
                {s.char}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Logo + Text */}
          <Link href="/" className="shrink-0 flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Empuwritten"
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
            <div>
              <span className="block font-serif text-xl font-bold text-dark-800 tracking-tight group-hover:text-gold-600 transition-colors">
                Empuwritten
              </span>
              <span className="block text-[10px] tracking-[0.15em] uppercase text-dark-400 font-sans -mt-0.5">
                Law & Culture
              </span>
            </div>
          </Link>

          {/* Nav */}
          <Nav />

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-gold-600 text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 hover:bg-gold-700 transition-colors"
          >
            Konsultasi
          </Link>
        </div>
      </header>
    </>
  );
}
