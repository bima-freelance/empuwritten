import type { Metadata } from "next";
import Link from "next/link";

// [EDIT] Ganti title dan description sesuai nama Anda
export const metadata: Metadata = {
  title: "Profil",
  description: "Profil Dr. [Nama Anda] — Doktor Hukum dan Seniman Topeng Bali.",
};

// [EDIT] Ganti dengan keahlian hukum Anda beserta persentase
const skillsHukum = [
  { label: "Hukum Adat & Tradisi Bali", level: 95 },
  { label: "[Bidang Hukum Spesialisasi 2]", level: 90 },
  { label: "[Bidang Hukum Spesialisasi 3]", level: 85 },
  { label: "Penulisan Karya Ilmiah", level: 92 },
];

// [EDIT] Ganti dengan keahlian seni Anda
const skillsSeni = [
  { label: "Tari Topeng Bali", level: 95 },
  { label: "Ukiran Topeng", level: 88 },
  { label: "Koreografi & Repertoar", level: 85 },
  { label: "Transmisi & Pengajaran", level: 90 },
];

// [EDIT] Ganti dengan riwayat pendidikan Anda
const pendidikan = [
  {
    tahun: "[Tahun]",
    gelar: "Doktor (Ph.D.) Ilmu Hukum",
    institusi: "[Nama Universitas]",
    keterangan: "Disertasi: [Judul Disertasi Anda]",
  },
  {
    tahun: "[Tahun]",
    gelar: "Magister Hukum (M.H.)",
    institusi: "[Nama Universitas]",
    keterangan: "[Bidang konsentrasi/spesialisasi]",
  },
  {
    tahun: "[Tahun]",
    gelar: "Sarjana Hukum (S.H.)",
    institusi: "[Nama Universitas]",
    keterangan: "[Prestasi, misal: Cumlaude]",
  },
];

// [EDIT] Ganti dengan pengalaman kerja dan seni Anda
const pengalaman = [
  {
    tahun: "[Tahun] – Sekarang",
    jabatan: "[Jabatan, misal: Dosen / Pengacara / Hakim]",
    institusi: "[Nama Institusi/Lembaga]",
    keterangan: "[Deskripsi singkat peran Anda]",
  },
  {
    tahun: "[Tahun] – [Tahun]",
    jabatan: "[Jabatan sebelumnya]",
    institusi: "[Institusi sebelumnya]",
    keterangan: "[Deskripsi]",
  },
  {
    tahun: "[Tahun] – Sekarang",
    jabatan: "Seniman Topeng Bali",
    institusi: "[Sanggar/Padepokan/Komunitas Seni]",
    keterangan: "Aktif pentas, mengajar, dan melestarikan tradisi Topeng Bali.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="bg-hero py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
            <span className="w-10 h-px bg-gold-500" />
            Profil
          </p>
          {/* [EDIT] Ganti dengan nama lengkap dan gelar Anda */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Dr. [Nama Lengkap Anda], S.H., M.H.
          </h1>
          <p className="text-gray-400 text-sm">
            <Link href="/" className="hover:text-gold-400 transition-colors">Beranda</Link>
            <span className="mx-2 text-dark-500">/</span>
            <span className="text-gold-400">Profil</span>
          </p>
        </div>
      </section>

      {/* ─── MAIN PROFILE ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[3/4] bg-dark-100 overflow-hidden max-w-sm">
                {/*
                  [EDIT] Ganti dengan foto resmi Anda.
                  Simpan foto di: public/images/foto-profil.jpg
                  Lalu ganti div di bawah dengan:
                  <Image src="/images/foto-profil.jpg" fill className="object-cover object-top" alt="Dr. [Nama]" />
                */}
                <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-900 flex flex-col items-center justify-center gap-3 text-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-xs tracking-widest uppercase font-sans">Foto Profil</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-gold-600 -z-10" />

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-2 mt-10">
                {[
                  /* [EDIT] Ganti angka dan label */
                  { num: "20+", label: "Tahun Karir" },
                  { num: "500+", label: "Karya Topeng" },
                  { num: "50+", label: "Publikasi" },
                ].map((h) => (
                  <div key={h.num} className="bg-dark-800 p-4 text-center">
                    <p className="font-serif text-xl font-bold text-gold-400">{h.num}</p>
                    <p className="text-xs text-dark-300 mt-1 leading-tight">{h.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="section-label">Biografi</p>
              <h2 className="section-heading mb-2">
                {/* [EDIT] Ganti dengan nama panggilan / tagline */}
                Praktisi Hukum &{" "}
                <span className="text-gold-600 italic">Seniman Budaya</span>
              </h2>
              <div className="gold-divider" />

              {/* [EDIT] Ganti semua paragraf bio dengan narasi Anda */}
              <div className="space-y-4 text-dark-500 leading-relaxed mb-8">
                <p>
                  [Paragraf 1: Perkenalkan diri Anda secara singkat. Siapa Anda,
                  dari mana asal Anda, dan apa yang membuat perjalanan hidup Anda
                  unik sebagai seorang Doktor Hukum sekaligus Seniman Topeng Bali.]
                </p>
                <p>
                  [Paragraf 2: Ceritakan perjalanan akademis hukum Anda —
                  kapan mulai tertarik dengan hukum, di mana kuliah, apa fokus
                  penelitian doktoral Anda, dan apa kontribusi Anda di bidang hukum.]
                </p>
                <p>
                  [Paragraf 3: Ceritakan perjalanan Anda dalam seni Topeng Bali —
                  kapan mulai belajar, siapa guru Anda, jenis topeng yang Anda
                  dalami, dan apa visi Anda dalam pelestarian seni ini.]
                </p>
              </div>

              {/* Identitas */}
              <div className="bg-gray-50 border border-gray-100 p-6 mb-8 space-y-3">
                {[
                  /* [EDIT] Ganti semua value dengan data Anda */
                  { label: "Nama", value: "Dr. [Nama Lengkap], S.H., M.H." },
                  { label: "Profesi", value: "Doktor Hukum · Seniman Topeng Bali" },
                  { label: "Institusi", value: "[Universitas / Lembaga Anda]" },
                  { label: "Lokasi", value: "[Kota], Bali, Indonesia" },
                  { label: "Email", value: "nama@email.com" },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4 text-sm">
                    <span className="text-dark-400 w-20 shrink-0 font-medium">{info.label}</span>
                    <span className="w-px h-4 bg-gray-300 mt-0.5" />
                    <span className="text-dark-700">{info.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Hubungi Saya</Link>
                <Link href="/blog" className="btn-outline-dark">Baca Tulisan</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PENDIDIKAN & PENGALAMAN ──────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Pendidikan */}
            <div>
              <p className="section-label">Akademik</p>
              <h2 className="section-heading mb-2">Riwayat <span className="text-gold-600 italic">Pendidikan</span></h2>
              <div className="gold-divider" />
              <div className="space-y-6 mt-8">
                {pendidikan.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                      {i < pendidikan.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-1">
                        {item.tahun}
                      </p>
                      <h4 className="font-serif font-bold text-dark-800 mb-0.5">{item.gelar}</h4>
                      <p className="text-sm font-medium text-dark-600 mb-1">{item.institusi}</p>
                      <p className="text-xs text-dark-400 leading-relaxed">{item.keterangan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pengalaman */}
            <div>
              <p className="section-label">Karir & Seni</p>
              <h2 className="section-heading mb-2">Riwayat <span className="text-gold-600 italic">Pengalaman</span></h2>
              <div className="gold-divider" />
              <div className="space-y-6 mt-8">
                {pengalaman.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                      {i < pengalaman.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-1">
                        {item.tahun}
                      </p>
                      <h4 className="font-serif font-bold text-dark-800 mb-0.5">{item.jabatan}</h4>
                      <p className="text-sm font-medium text-dark-600 mb-1">{item.institusi}</p>
                      <p className="text-xs text-dark-400 leading-relaxed">{item.keterangan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEAHLIAN ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label justify-center">Kompetensi</p>
            <h2 className="section-heading">Keahlian <span className="text-gold-600 italic">Hukum & Seni</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Hukum */}
            <div>
              <h3 className="font-serif text-xl font-bold text-dark-800 mb-6 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-gold-500" />
                Keahlian Hukum
              </h3>
              <div className="space-y-5">
                {skillsHukum.map((skill) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-dark-700">{skill.label}</span>
                      <span className="text-xs font-semibold text-gold-600">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 overflow-hidden">
                      <div className="h-full bg-gold-500" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Seni */}
            <div>
              <h3 className="font-serif text-xl font-bold text-dark-800 mb-6 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-gold-500" />
                Keahlian Seni Topeng Bali
              </h3>
              <div className="space-y-5">
                {skillsSeni.map((skill) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-dark-700">{skill.label}</span>
                      <span className="text-xs font-semibold text-gold-600">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 overflow-hidden">
                      <div className="h-full bg-gold-500" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALERI TOPENG (Placeholder) ──────────────────────────────── */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-gold-400 mb-4">
              <span className="w-8 h-px bg-gold-500" />
              Karya Seni
              <span className="w-8 h-px bg-gold-500" />
            </p>
            <h2 className="section-heading-light">
              Galeri <span className="text-gold-400 italic">Topeng Bali</span>
            </h2>
          </div>

          {/* [EDIT] Ganti placeholder dengan foto karya topeng Anda
              Simpan gambar di public/images/topeng/topeng-1.jpg, dst.
              Contoh penggunaan:
              <Image src="/images/topeng/topeng-1.jpg" width={400} height={300} className="object-cover" alt="..." />
          */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Topeng Keras",
              "Topeng Tua",
              "Topeng Dalem",
              "Topeng Bondres",
              "Topeng Arsa Wijaya",
              "Topeng Sidakarya",
              "[Jenis Topeng 7]",
              "[Jenis Topeng 8]",
            ].map((nama, i) => (
              <div
                key={i}
                className="aspect-square bg-dark-700 border border-dark-600 flex flex-col items-center justify-center gap-2 group hover:border-gold-500 transition-colors cursor-pointer"
              >
                <div className="text-dark-500 group-hover:text-gold-500 transition-colors">
                  {/* Ikon topeng */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-dark-400 group-hover:text-gold-400 transition-colors text-center px-2">
                  {nama}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-dark-500 text-xs mt-6 italic">
            * Ganti setiap kotak dengan foto karya topeng Anda
          </p>
        </div>
      </section>

      {/* ─── QUOTE ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold-500 text-5xl font-serif mb-6">&ldquo;</p>
          {/* [EDIT] Ganti dengan quote favorit atau filosofi hidup Anda */}
          <blockquote className="font-serif text-2xl md:text-3xl text-dark-800 font-bold italic leading-snug mb-6">
            [Tulis quote atau filosofi hidup Anda di sini. Bisa kutipan dari tokoh
            hukum, filsuf Bali, atau perkataan Anda sendiri.]
          </blockquote>
          {/* [EDIT] Ganti dengan atribusi quote */}
          <p className="text-sm text-dark-400 tracking-widest uppercase">— Dr. [Nama Anda]</p>
        </div>
      </section>
    </>
  );
}
