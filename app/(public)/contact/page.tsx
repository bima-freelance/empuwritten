"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: `[${form.subject}] ${form.message}` }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ─── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="bg-hero py-20 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
            <span className="w-10 h-px bg-gold-500" />
            Kontak
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Hubungi Saya
          </h1>
          <p className="text-gray-400 text-sm">
            <Link href="/" className="hover:text-gold-400 transition-colors">Beranda</Link>
            <span className="mx-2 text-dark-500">/</span>
            <span className="text-gold-400">Kontak</span>
          </p>
        </div>
      </section>

      {/* ─── CONTACT CONTENT ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-16">
            {/* Form */}
            <div>
              <p className="section-label">Pesan</p>
              <h2 className="section-heading mb-2">
                Ada yang Ingin{" "}
                <span className="text-gold-600 italic">Anda Sampaikan</span>?
              </h2>
              <div className="gold-divider" />
              {/* [EDIT] Ganti deskripsi pesan */}
              <p className="text-dark-500 leading-relaxed mb-8">
                Saya terbuka untuk konsultasi hukum, undangan seminar dan
                kuliah tamu, kolaborasi penelitian, serta undangan pentas
                Topeng Bali. Silakan isi formulir di bawah ini.
              </p>

              {status === "success" ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6">
                  <p className="font-semibold text-green-800 mb-1">Pesan Terkirim!</p>
                  <p className="text-green-700 text-sm">
                    Terima kasih telah menghubungi saya. Saya akan merespons
                    dalam 1–2 hari kerja.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-dark-500 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm text-dark-700 focus:outline-none focus:border-gold-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="Nama lengkap Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold tracking-widest uppercase text-dark-500 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm text-dark-700 focus:outline-none focus:border-gold-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-dark-500 mb-2">
                      Keperluan
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm text-dark-700 focus:outline-none focus:border-gold-500 transition-colors bg-gray-50 focus:bg-white"
                    >
                      <option value="">— Pilih Keperluan —</option>
                      {/* [EDIT] Sesuaikan opsi keperluan */}
                      <option value="Konsultasi Hukum">Konsultasi Hukum</option>
                      <option value="Undangan Seminar / Kuliah Tamu">Undangan Seminar / Kuliah Tamu</option>
                      <option value="Kolaborasi Penelitian">Kolaborasi Penelitian</option>
                      <option value="Undangan Pentas Topeng Bali">Undangan Pentas Topeng Bali</option>
                      <option value="Workshop Topeng Bali">Workshop Topeng Bali</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-dark-500 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm text-dark-700 focus:outline-none focus:border-gold-500 transition-colors bg-gray-50 focus:bg-white resize-none"
                      placeholder="Tuliskan pesan atau pertanyaan Anda secara detail..."
                    />
                  </div>
                  {status === "error" && (
                    <p className="text-sm text-red-600 border-l-4 border-red-400 pl-3">
                      Terjadi kesalahan. Silakan coba lagi atau hubungi langsung via email.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Mengirim…" : "Kirim Pesan →"}
                  </button>
                </form>
              )}
            </div>

            {/* Info Sidebar */}
            <div className="space-y-0">
              {/* Kontak utama */}
              <div className="bg-dark-800 p-8">
                {/* [EDIT] Ganti nama */}
                <h3 className="font-serif text-lg font-bold text-white mb-6">
                  Informasi Kontak
                </h3>
                <div className="space-y-6">
                  {/* [EDIT] Ganti semua data kontak */}
                  {[
                    {
                      label: "Email",
                      value: "bagusdananjaya1@gmail.com",
                      href: "mailto:bagusdananjaya1@gmail.com",
                    },
                    {
                      label: "Telepon",
                      value: "+6282-337-331-331",
                      href: "tel:+6282337331331",
                    },
                    {
                      label: "Kantor",
                      value: "Pagrahān Lor Kusara\nJl. Raya Tegallalang, Tegallalang, Kec. Tegallalang, Bali 80561\nKabupaten Gianyar, Bali",
                      href: null,
                    },
                  ].map((info) => (
                    <div key={info.label}>
                      <p className="text-xs font-semibold tracking-widest uppercase text-gold-500 mb-1">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-gray-300 hover:text-gold-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                          {info.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Waktu respons */}
              <div className="bg-gold-600 p-8">
                <h3 className="font-serif text-base font-bold text-white mb-3">
                  Waktu Respons
                </h3>
                <p className="text-gold-100 text-sm leading-relaxed mb-4">
                  {/* [EDIT] Sesuaikan dengan jadwal Anda */}
                  Saya biasanya merespons dalam 1–2 hari kerja. Untuk urusan
                  mendesak, silakan hubungi langsung via telepon atau email.
                </p>
                {/* [EDIT] Sesuaikan jam operasional */}
                <div className="space-y-1 text-xs text-gold-200">
                  <p>Senin – Jumat: 09.00 – 17.00 WITA</p>
                  <p>Sabtu: 09.00 – 13.00 WITA</p>
                </div>
              </div>

              {/* Media sosial */}
              <div className="bg-dark-700 p-8">
                <h3 className="font-serif text-base font-bold text-white mb-4">
                  Media Sosial
                </h3>
                <div className="space-y-3">
                  {/* [EDIT] Ganti href dengan URL akun Anda */}
                  {[
                    { platform: "Instagram", handle: "@tubagusgallery", href: "https://www.instagram.com/tubagusgallery" },
                    { platform: "Tiktok", handle: "@tubagusgallery", href: "https://www.tiktok.com/@tubagusgallery" },
                    { platform: "Facebook", handle: "Tubagus Dananjaya", href: "https://www.facebook.com/tubagus.dananjaya.9" },
                  ].map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      className="flex items-center gap-3 text-sm text-gray-300 hover:text-gold-400 transition-colors group"
                    >
                      <span className="w-7 h-7 border border-dark-500 group-hover:border-gold-500 flex items-center justify-center text-[10px] font-bold transition-colors">
                        {s.platform.slice(0, 2)}
                      </span>
                      <span>{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
