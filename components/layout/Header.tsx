import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark-900 text-gray-400 text-xs">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {/* [EDIT] Ganti dengan email Anda */}
            <a
              href="mailto:nama@email.com"
              className="hover:text-gold-400 transition-colors"
            >
              nama@email.com
            </a>
            {/* [EDIT] Ganti dengan nomor telepon Anda — atau hapus baris ini */}
            <span className="hidden sm:inline text-dark-600">|</span>
            <span className="hidden sm:inline">+62 812-XXXX-XXXX</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            {/* [EDIT] Ganti href="#" dengan URL media sosial Anda */}
            {[
              { label: "Instagram", char: "Ig" },
              { label: "LinkedIn", char: "Li" },
              { label: "YouTube", char: "Yt" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
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
          {/* Logo — [EDIT] Ganti nama di sini */}
          <Link href="/" className="shrink-0 group">
            <span className="font-serif text-xl font-bold text-dark-800 tracking-tight group-hover:text-gold-600 transition-colors">
              {/* [EDIT] Nama lengkap atau nama singkat Anda */}
              Empuwritten
            </span>
            <span className="block text-[10px] tracking-[0.15em] uppercase text-dark-400 font-sans -mt-0.5">
              Doktor Hukum · Seniman Topeng Bali
            </span>
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
