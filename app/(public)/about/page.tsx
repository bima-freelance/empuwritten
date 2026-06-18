import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profil",
  description: "Profil Dr. Putu Bagus Dananjaya, S.H., M.Kn — Doktor Hukum dan Seniman Topeng Bali.",
};

// Bidang riset dari Google Scholar
const skillsHukum = [
  { label: "Hukum Kontrak (Contract Law)", level: 95 },
  { label: "Hukum Kenotariatan (Notary Law)", level: 95 },
  { label: "Hukum Perdata (Privat Law)", level: 90 },
  { label: "Teori Hukum (Theory of Law)", level: 88 },
  { label: "Filsafat Hukum (Philosophy of Law)", level: 85 },
];

const skillsSeni = [
  { label: "Topeng Bali", level: 95 },
  { label: "calonarang", level: 92 },
  { label: "Mewirama & Mekidung", level: 92 },
  { label: "Menulis Tulisan Tradisi", level: 85 },
];

// Publikasi dari Google Scholar (36 kutipan, h-index 3)
const publikasi = [
  {
    tahun: "2024",
    judul: "Dasar-Dasar Hukum: Pedoman Hukum di Indonesia",
    penerbit: "PT. Sonpedia Publishing Indonesia",
    kutipan: 19,
  },
  {
    tahun: "2022",
    judul: "Mekanisme Citizen Lawsuit dalam Perspektif Sistem Peradilan Di Indonesia",
    penerbit: "Jurnal Hukum Saraswati (JHS) 4 (1), 15–30",
    kutipan: 6,
  },
  {
    tahun: "2024",
    judul: "Penegakan Hukum Pemilu di Indonesia: Tantangan dan Prospek Keberlanjutan Demokrasi",
    penerbit: "PT. Sonpedia Publishing Indonesia",
    kutipan: 5,
  },
  {
    tahun: "2020",
    judul: "Perlindungan Hukum Terhadap Hak Cipta Geguritan Bali Di Indonesia",
    penerbit: "Acta Comitas 5 (3)",
    kutipan: 3,
  },
  {
    tahun: "2024",
    judul: "Perlindungan Hukum Terhadap Profesi Advokat dalam Pencucian Uang",
    penerbit: "Ranah Research: Journal of Multidisciplinary Research and Development",
    kutipan: 2,
  },
  {
    tahun: "2024",
    judul: "Hukum Perancangan Kontrak",
    penerbit: "PT. Sonpedia Publishing Indonesia",
    kutipan: 0,
  },
  {
    tahun: "2025",
    judul: "Indonesian Advocates' Success Fee Agreements: Policies and Challenges",
    penerbit: "Journal of Sustainable Development and Regulatory Issues (JSDERI) 3 (3)",
    kutipan: 0,
  },
];

const pendidikan = [
  {
    tahun: "2022–kini",
    gelar: "Doktor (S3) Ilmu Hukum",
    institusi: "Universitas Tarumanegara, Jakarta",
    keterangan: "Program Doktoral Ilmu Hukum",
  },
  {
    tahun: "2019–2022",
    gelar: "Magister Kenotariatan (M.Kn)",
    institusi: "Universitas Udayana, Bali",
    keterangan: "Program Studi Magister Kenotariatan",
  },
  {
    tahun: "2014–2018",
    gelar: "Sarjana Hukum (S.H.)",
    institusi: "Fakultas Hukum Universitas Udayana",
    keterangan: "Bagus Fakultas Hukum UNUD 2016 · Bagus Foto Genik UNUD 2016",
  },
  {
    tahun: "2011–2014",
    gelar: "SMA",
    institusi: "SMAN 1 Ubud",
    keterangan: "Ketua Umum OSIS · Juara 1 & 2 Mewirama Se-Kabupaten & Se-Provinsi Bali 2014",
  },
];

const organisasi = [
  {
    tahun: "2025–2030",
    jabatan: "Petajuh (Wakil Ketua)",
    institusi: "Pasikian Yowana Provinsi Bali",
    keterangan: "Organisasi kepemudaan Hindu Bali tingkat provinsi.",
  },
  {
    tahun: "Aktif",
    jabatan: "Court Monitoring",
    institusi: "Komisi Pemberantasan Korupsi (KPK) Provinsi Bali",
    keterangan: "Pemantauan persidangan dalam rangka pemberantasan korupsi.",
  },
  {
    tahun: "Aktif",
    jabatan: "Ketua Biro Organisasi",
    institusi: "Perhimpunan Mahasiswa Hukum Indonesia Cabang Bali",
    keterangan: "Koordinasi organisasi mahasiswa hukum se-Bali.",
  },
  {
    tahun: "Aktif",
    jabatan: "Ketua",
    institusi: "Forum Intelektual Muda Hindu Dharma Kab. Gianyar",
    keterangan: "Mendorong kajian intelektual berbasis nilai Hindu Dharma.",
  },
];

const prestasi = [
  { tahun: "2024", label: "Juara 2 Lomba Topeng Pengerawos Se-Bali — Institut Seni Indonesia Bali" },
  { tahun: "2016", label: "Juara 1 Internal Mooting Peradilan Semu — Fakultas Hukum UNUD" },
  { tahun: "2016", label: "Bagus Fakultas Hukum & Bagus Foto Genik — Universitas Udayana" },
  { tahun: "2014", label: "Juara 2 Mewirama Se-Provinsi Bali" },
  { tahun: "2014", label: "Juara 1 Mewirama Se-Kabupaten Gianyar" },
  { tahun: "2011", label: "Juara 3 Mekidung Se-Kabupaten Gianyar" },
  { tahun: "2008", label: "Juara 3 Lomba Tari Kebyar Duduk — Kabupaten Gianyar" },
  { tahun: "2007", label: "Juara 3 Lomba Baris Tunggal Se-Kabupaten Gianyar" },
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Dr. Putu Bagus Dananjaya, S.H., M.Kn
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
              <div className="aspect-[3/4] bg-dark-100 overflow-hidden max-w-sm relative">
                <Image
                  src="/images/profile.png"
                  fill
                  className="object-cover object-top"
                  alt="Dr. Putu Bagus Dananjaya"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-gold-600 -z-10" />

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-2 mt-10">
                {[
                  { num: "36", label: "Dikutip" },
                  { num: "13+", label: "Publikasi" },
                  { num: "h=3", label: "H-Index" },
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
                Praktisi Hukum &{" "}
                <span className="text-gold-600 italic">Seniman Budaya Bali</span>
              </h2>
              <div className="gold-divider" />

              <div className="space-y-4 text-dark-500 leading-relaxed mb-8">
                <p>
                  Putu Bagus Dananjaya lahir di Tegallalang, Gianyar, Bali pada 10 Juni 1996.
                  Ia menempuh pendidikan hukum hingga jenjang doktoral — dari Sarjana dan
                  Magister Kenotariatan di Universitas Udayana, hingga Program Doktoral di
                  Universitas Tarumanegara Jakarta.
                </p>
                <p>
                  Sebagai praktisi hukum, ia aktif dalam gerakan pemberantasan korupsi melalui
                  Court Monitoring KPK Provinsi Bali, serta berkiprah di organisasi mahasiswa
                  hukum nasional. Kepemimpinannya tecermin dari berbagai jabatan strategis yang
                  ia emban sejak masa sekolah hingga kini.
                </p>
                <p>
                  Di sisi lain, ia adalah seniman Bali yang berprestasi — meraih berbagai juara
                  dalam bidang tari, mewirama, dan topeng. Baginya, hukum dan seni bukan dua
                  dunia yang berseberangan, melainkan dua sayap yang mengangkat peradaban.
                </p>
              </div>

              {/* Identitas */}
              <div className="bg-gray-50 border border-gray-100 p-6 mb-8 space-y-3">
                {[
                  { label: "Nama", value: "Dr. Putu Bagus Dananjaya, S.H., M.Kn" },
                  { label: "TTL", value: "Tegallalang, 10 Juni 1996" },
                  { label: "Profesi", value: "Dosen FH Unmas Denpasar · Seniman Topeng Bali" },
                  { label: "Lokasi", value: "Tegallalang, Gianyar, Bali" },
                  { label: "Email", value: "dananjaya771@icloud.com" },
                  { label: "No. HP", value: "082 337 331 331" },
                ].map((info) => (
                  <div key={info.label} className="flex items-start gap-4 text-sm">
                    <span className="text-dark-400 w-20 shrink-0 font-medium">{info.label}</span>
                    <span className="w-px h-4 bg-gray-300 mt-0.5 shrink-0" />
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

      {/* ─── PENDIDIKAN & ORGANISASI ──────────────────────────────────── */}
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
                      {i < pendidikan.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-1">{item.tahun}</p>
                      <h4 className="font-serif font-bold text-dark-800 mb-0.5">{item.gelar}</h4>
                      <p className="text-sm font-medium text-dark-600 mb-1">{item.institusi}</p>
                      <p className="text-xs text-dark-400 leading-relaxed">{item.keterangan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organisasi */}
            <div>
              <p className="section-label">Pengabdian</p>
              <h2 className="section-heading mb-2">Riwayat <span className="text-gold-600 italic">Organisasi</span></h2>
              <div className="gold-divider" />
              <div className="space-y-6 mt-8">
                {organisasi.map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                      {i < organisasi.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-1">{item.tahun}</p>
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
            <div>
              <h3 className="font-serif text-xl font-bold text-dark-800 mb-6 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-gold-500" />Keahlian Hukum
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
            <div>
              <h3 className="font-serif text-xl font-bold text-dark-800 mb-6 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-gold-500" />Keahlian Seni & Budaya Bali
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

      {/* ─── PRESTASI ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-gold-400 mb-4">
              <span className="w-8 h-px bg-gold-500" />Penghargaan<span className="w-8 h-px bg-gold-500" />
            </p>
            <h2 className="section-heading-light">
              Prestasi & <span className="text-gold-400 italic">Penghargaan</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prestasi.map((item, i) => (
              <div key={i} className="bg-dark-700 border border-dark-600 p-5 hover:border-gold-600 transition-colors">
                <p className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-2">{item.tahun}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUBLIKASI ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label">Akademik</p>
              <h2 className="section-heading">
                Publikasi <span className="text-gold-600 italic">Ilmiah</span>
              </h2>
            </div>
            <a
              href="https://scholar.google.co.id/citations?hl=id&user=s5NYl5kAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-600 hover:text-gold-800 transition-colors"
            >
              Google Scholar →
            </a>
          </div>

          {/* Scholar stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Total Kutipan", value: "36" },
              { label: "H-Index", value: "3" },
              { label: "i10-Index", value: "1" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-gray-100 p-5 text-center">
                <p className="font-serif text-3xl font-bold text-gold-600 mb-1">{s.value}</p>
                <p className="text-xs text-dark-400 tracking-wide uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Daftar publikasi */}
          <div className="space-y-3">
            {publikasi.map((pub, i) => (
              <div key={i} className="bg-white border border-gray-100 p-5 flex items-start gap-5 hover:border-gold-300 transition-colors">
                <span className="text-xs font-semibold text-gold-600 bg-gold-50 px-2.5 py-1 rounded shrink-0 mt-0.5">
                  {pub.tahun}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-dark-800 text-sm leading-snug mb-1">{pub.judul}</p>
                  <p className="text-xs text-dark-400">{pub.penerbit}</p>
                </div>
                {pub.kutipan > 0 && (
                  <span className="text-xs text-dark-400 shrink-0 bg-gray-50 px-2.5 py-1 rounded">
                    {pub.kutipan} kutipan
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href="https://scholar.google.co.id/citations?hl=id&user=s5NYl5kAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark inline-flex"
            >
              Lihat Semua Publikasi →
            </a>
          </div>
        </div>
      </section>

      {/* ─── QUOTE ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-gold-500 text-5xl font-serif mb-6">&ldquo;</p>
          <blockquote className="font-serif text-2xl md:text-3xl text-dark-800 font-bold italic leading-snug mb-6">
            Hukum tanpa seni adalah kering. Seni tanpa hukum adalah liar.
            Keduanya adalah napas peradaban.
          </blockquote>
          <p className="text-sm text-dark-400 tracking-widest uppercase">— Dr. Putu Bagus Dananjaya, S.H., M.Kn</p>
        </div>
      </section>
    </>
  );
}
