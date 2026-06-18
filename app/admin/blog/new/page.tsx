"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Image from "next/image";

const ArticleEditor = dynamic(
  () => import("@/components/blog/ArticleEditor"),
  { ssr: false }
);

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    category: "LAW",
    published: false,
    featuredImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const featuredImageRef = useRef<HTMLInputElement>(null);

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, featuredImage: url }));
    } else {
      alert("Gagal upload gambar");
    }
    setUploadingImage(false);
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tags }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Terjadi kesalahan");
      setLoading(false);
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          ← Kembali
        </button>
        <h1 className="font-serif text-2xl font-bold text-gray-900">
          Tulis Artikel Baru
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Judul */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Judul *
          </label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Judul artikel"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Kategori *
          </label>
          <div className="flex gap-3">
            {[
              { value: "LAW", label: "⚖️ Hukum", desc: "Artikel hukum, kebijakan, analisis yuridis" },
              { value: "CULTURE", label: "🎭 Budaya", desc: "Seni, tradisi Bali, kebudayaan" },
            ].map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setForm({ ...form, category: cat.value })}
                className={`flex-1 border-2 rounded-lg px-4 py-3 text-left transition-all ${
                  form.category === cat.value
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <p className="font-semibold text-sm">{cat.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Featured Image
          </label>
          {form.featuredImage ? (
            <div className="relative">
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={form.featuredImage}
                  alt="Featured image"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, featuredImage: "" })}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => featuredImageRef.current?.click()}
              disabled={uploadingImage}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg px-6 py-10 text-center hover:border-brand-400 transition-colors disabled:opacity-50"
            >
              <p className="text-2xl mb-2">🖼</p>
              <p className="text-sm font-medium text-gray-600">
                {uploadingImage ? "Mengupload…" : "Klik untuk upload gambar"}
              </p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP · Maks. 5MB</p>
            </button>
          )}
          <input
            ref={featuredImageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFeaturedImageUpload}
          />
        </div>

        {/* Ringkasan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Ringkasan
          </label>
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            placeholder="Ringkasan singkat artikel (opsional)"
          />
        </div>

        {/* Konten */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Konten *
          </label>
          <ArticleEditor
            value={form.content}
            onChange={(val) => setForm({ ...form, content: val })}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Tags
          </label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            placeholder="Contoh: Kontrak, Notariat, Topeng (pisahkan dengan koma)"
          />
        </div>

        {/* Publish toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">
            Publikasikan sekarang
          </label>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} size="lg">
            {loading ? "Menyimpan…" : "Simpan Artikel"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            size="lg"
          >
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
}
