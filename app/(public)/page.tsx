import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ArticleCard from "@/components/blog/ArticleCard";

export const revalidate = 0; // selalu fetch data terbaru

export default async function HomePage() {
  const featuredPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { tags: true },
  });

  return (
    <>
      <section className="relative bg-hero min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(201,135,30,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,135,30,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
              <span className="w-10 h-px bg-gold-500" />
              Law & Culture
            </p>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-[1.05] mb-8">
              Empuwritten
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
              EmpuWritten hadir untuk mengajak siapa saja mengenal Bali dari sisi yang jarang tersorot — bagaimana hukum dan kebudayaan membentuk cara hidup, nilai, dan identitas masyarakatnya. Ditulis dengan bahasa yang mudah dipahami, namun tetap berbobot.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Lihat Profil Lengkap
              </Link>
              <Link href="/blog" className="btn-outline">
                Baca Tulisan
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip — [EDIT] Ganti angka dengan pencapaian nyata Anda */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-5 grid grid-cols-3 gap-6 text-center">
            {[
              { num: "36", label: "Dikutip Akademik" },
              { num: "13+", label: "Publikasi Ilmiah" },
              { num: "9", label: "Prestasi & Penghargaan" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-gold-400 font-serif text-2xl font-bold">{stat.num}</p>
                <p className="text-gray-400 text-xs tracking-wide mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ABOUT STRIP
          [EDIT] Foto profil, bio singkat, pencapaian
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image — [EDIT] Ganti placeholder dengan foto Anda */}
            <div className="relative">
              <div className="aspect-[4/5] bg-dark-100 overflow-hidden relative">
                <Image
                  src="/images/profile.png"
                  fill
                  className="object-cover object-top"
                  alt="Profil"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* Gold accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-600 -z-10" />
              {/* Topeng icon card */}
              <div className="absolute bottom-8 -right-8 bg-white shadow-xl p-5 max-w-[210px]">
                {/* [EDIT] Ganti dengan quote atau kalimat filosofis Anda */}
                <p className="font-serif text-dark-800 text-sm italic leading-relaxed">
                  &ldquo;Hukum tanpa seni adalah kering. Seni tanpa hukum adalah
                  liar. Keduanya adalah napas peradaban.&rdquo;
                </p>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="section-label">Tentang Saya</p>
              {/* [EDIT] Ganti nama dan gelar */}
              <h2 className="section-heading mb-5">
                Antara Dunia Akademisi dan{" "}
                <span className="text-gold-600 italic">Panggung Kesenian</span>
              </h2>
              <div className="gold-divider" />

              {/* [EDIT] Ganti dengan bio Anda */}
              <p className="text-dark-500 leading-relaxed mb-4">
                Saya adalah seorang Doktor Hukum yang mendalami hukum perdata terkhusus hukum perjanjian (Contract Law Expert),
                sekaligus seniman Topeng Bali dan Calonarang yang telah menekuni tradisi ini
                selama lebih dari 23 tahun.
              </p>
              <p className="text-dark-500 leading-relaxed mb-8">
                Dua dunia yang sering dianggap berseberangan ini justru saling
                melengkapi dalam perjalanan hidup saya. Hukum mengajarkan
                ketegasan dan keadilan. Topeng Bali mengajarkan kelenturan dan
                kedalaman jiwa.
              </p>

              {/* [EDIT] Ganti dengan pencapaian utama Anda */}
              <ul className="space-y-3 mb-10">
                {[
                  "Doktor Hukum — Universitas Tarumanagara, 2026",
                  "Seniman Topeng Bali — Sanggar Pagrahān Lor Kusara, 2012",
                  "Dosen Hukum, Universitas Mahasaraswati Denpasar, 2022 - sekarang",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-dark-600">
                    <span className="w-5 h-px bg-gold-500 shrink-0 mt-2.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/about" className="btn-outline-dark">
                Profil Lengkap →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DUA DUNIA — Hukum & Seni
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-gold-400 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              Dua Dunia, Satu Jiwa
              <span className="w-8 h-px bg-gold-500" />
            </p>
            <h2 className="section-heading-light">
              Keahlian yang{" "}
              <span className="text-gold-400 italic">Saling Melengkapi</span>
            </h2>
          </div>

          {/* Dua kolom besar: Hukum dan Seni */}
          <div className="grid md:grid-cols-2 gap-px bg-dark-600 mb-px">
            {/* Hukum */}
            <div className="bg-dark-800 p-10 group hover:bg-dark-700 transition-colors">
              <div className="w-12 h-12 border border-gold-600 flex items-center justify-center mb-6">
                {/* Ikon hukum */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">Doktor Hukum</h3>
              {/* [EDIT] Ganti dengan deskripsi praktik hukum Anda */}
              <p className="text-dark-300 leading-relaxed mb-6">
                Dosen Fakultas Hukum Universitas Mahasaraswati Denpasar. Menekuni
                hukum kontrak, kenotariatan, dan hukum perdata dengan 13+ publikasi
                ilmiah dan 36 kutipan akademik.
              </p>
              <ul className="space-y-2 text-sm text-dark-300">
                {[
                  "Hukum Kontrak (Contract Law)",
                  "Hukum Kenotariatan (Notary Law)",
                  "Hukum Perdata & Filsafat Hukum",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gold-500 mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Seni */}
            <div className="bg-dark-800 p-10 group hover:bg-dark-700 transition-colors">
              <div className="w-12 h-12 border border-gold-600 flex items-center justify-center mb-6">
                {/* Ikon topeng/seni */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">Seniman Topeng Bali</h3>
              {/* [EDIT] Ganti dengan deskripsi seni Topeng Bali Anda */}
              <p className="text-dark-300 leading-relaxed mb-6">
                Seniman Topeng Bali dari Sanggar Pagrahān Lor Kusara sejak 2012.
                Juara 2 Lomba Topeng Pengerawos Se-Bali di ISI Bali, serta aktif
                pentas dan melestarikan tradisi leluhur.
              </p>
              <ul className="space-y-2 text-sm text-dark-300">
                {[
                  "Topeng Bali",
                  "Calonarang",
                  "Mewirama & Mekidung",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gold-500 mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4 card bawah */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-600">
            {[
              {
                icon: "✦",
                title: "Akademisi",
                desc: "Dosen Fakultas Hukum Universitas Mahasaraswati Denpasar. Mengampu mata kuliah hukum kontrak, kenotariatan, dan hukum perdata.",
              },
              {
                icon: "◈",
                title: "Praktisi Hukum",
                desc: "Court Monitoring KPK Provinsi Bali. Aktif dalam organisasi hukum nasional dan advokasi penegakan hukum pemilu.",
              },
              {
                icon: "❧",
                title: "Pelestari Budaya",
                desc: "Aktif dalam pelestarian seni Topeng Bali dan Mewirama. Wakil Ketua Pasikian Yowana Provinsi Bali 2025–2030.",
              },
              {
                icon: "⟡",
                title: "Penulis & Peneliti",
                desc: "Penulis 3+ buku hukum dan 10+ jurnal ilmiah. 36 kutipan akademik di Google Scholar.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-dark-800 p-7 hover:bg-dark-700 transition-colors">
                <p className="text-gold-500 text-2xl mb-4">{item.icon}</p>
                <h3 className="font-serif text-base font-bold text-white mb-2">{item.title}</h3>
                {/* [EDIT] Ganti deskripsi setiap kartu */}
                <p className="text-dark-300 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED POSTS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-label">Tulisan</p>
              <h2 className="section-heading">Tulisan Terbaru</h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-gold-600 hover:text-gold-800 transition-colors uppercase"
            >
              Lihat Semua →
            </Link>
          </div>

          {featuredPosts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-300">
              <p className="text-dark-400 text-sm mb-2">Belum ada tulisan.</p>
              <p className="text-dark-300 text-xs">
                Masuk ke{" "}
                <a href="/admin" className="text-gold-600 hover:underline">
                  Admin Panel
                </a>{" "}
                untuk mulai menulis.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA BANNER
          [EDIT] Sesuaikan teks ajakan
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(120deg, #0c0c16 0%, #1e1a08 100%)" }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, #c9871e 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-gold-400 mb-5">
            <span className="w-8 h-px bg-gold-500" />
            Konsultasi & Kolaborasi
            <span className="w-8 h-px bg-gold-500" />
          </p>
          {/* [EDIT] Ganti teks CTA */}
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5">
            Butuh Konsultasi Hukum atau{" "}
            <span className="text-gold-400 italic">Kolaborasi Seni</span>?
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Saya terbuka untuk konsultasi hukum, undangan mengisi seminar,
            kolaborasi pelestarian seni budaya, serta pertunjukan Topeng Bali.
          </p>
          <Link href="/contact" className="btn-primary">
            Hubungi Saya Sekarang
          </Link>
        </div>
      </section>
    </>
  );
}
