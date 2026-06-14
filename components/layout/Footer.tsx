import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          {/* [EDIT] Ganti nama di sini */}
          <Link href="/" className="inline-block mb-2">
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              Dr. <span className="text-gold-500">[Nama Anda]</span>
            </span>
          </Link>
          <p className="text-xs tracking-widest uppercase text-dark-400 mb-5">
            Doktor Hukum · Seniman Topeng Bali
          </p>
          {/* [EDIT] Ganti deskripsi singkat */}
          <p className="text-sm leading-relaxed mb-6 max-w-xs">
            Menjembatani dunia hukum dan seni budaya Bali. Praktisi hukum
            sekaligus pelestari tradisi Topeng Bali yang kaya makna filosofis.
          </p>
          <div className="flex items-center gap-2">
            {/* [EDIT] Ganti href="#" dengan URL media sosial */}
            {[
              { label: "Instagram", char: "Ig" },
              { label: "LinkedIn", char: "Li" },
              { label: "YouTube", char: "Yt" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center border border-dark-600 text-[10px] font-semibold text-gray-500 hover:border-gold-500 hover:text-gold-400 transition-colors"
              >
                {s.char}
              </a>
            ))}
          </div>
        </div>

        {/* Navigasi */}
        <div>
          <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
            Navigasi
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { href: "/", label: "Beranda" },
              { href: "/about", label: "Profil" },
              { href: "/blog", label: "Tulisan" },
              { href: "/contact", label: "Kontak" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-gold-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-3 h-px bg-dark-600 group-hover:bg-gold-500 transition-colors" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-5">
            Kontak
          </h4>
          <ul className="space-y-3 text-sm">
            {/* [EDIT] Ganti dengan kontak Anda */}
            <li>
              <a
                href="mailto:nama@email.com"
                className="hover:text-gold-400 transition-colors"
              >
                nama@email.com
              </a>
            </li>
            <li className="text-dark-400 text-xs leading-relaxed">
              {/* [EDIT] Ganti dengan kota/provinsi Anda */}
              Bali, Indonesia
            </li>
            <li className="pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-dark-600 text-gray-300 text-xs font-semibold tracking-wider uppercase px-5 py-2.5 hover:border-gold-500 hover:text-gold-400 transition-colors"
              >
                Hubungi →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dark-400">
          {/* [EDIT] Ganti nama */}
          <p>© {new Date().getFullYear()} Dr. [Nama Anda]. Hak cipta dilindungi.</p>
          <p>Dibangun dengan Next.js & PostgreSQL</p>
        </div>
      </div>
    </footer>
  );
}
