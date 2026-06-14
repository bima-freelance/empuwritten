import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed tags
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { name: "Hukum" }, update: {}, create: { name: "Hukum" } }),
    prisma.tag.upsert({ where: { name: "Hukum Adat" }, update: {}, create: { name: "Hukum Adat" } }),
    prisma.tag.upsert({ where: { name: "Topeng Bali" }, update: {}, create: { name: "Topeng Bali" } }),
    prisma.tag.upsert({ where: { name: "Budaya Bali" }, update: {}, create: { name: "Budaya Bali" } }),
    prisma.tag.upsert({ where: { name: "Opini" }, update: {}, create: { name: "Opini" } }),
    prisma.tag.upsert({ where: { name: "Riset" }, update: {}, create: { name: "Riset" } }),
  ]);

  // Seed posts
  await prisma.post.upsert({
    where: { slug: "topeng-bali-sebagai-cermin-hukum-adat" },
    update: {},
    create: {
      title: "Topeng Bali sebagai Cermin Hukum Adat",
      slug: "topeng-bali-sebagai-cermin-hukum-adat",
      excerpt:
        "Tari Topeng bukan sekadar pertunjukan — ia adalah kodifikasi hukum adat Bali yang hidup, bergerak, dan diwariskan dari generasi ke generasi.",
      content: `<p>Bagi masyarakat Bali, Tari Topeng bukan sekadar seni pertunjukan. Ia adalah medium penyampaian nilai, norma, dan tatanan sosial yang telah berjalan ribuan tahun — jauh sebelum hukum tertulis mengenal kata "kodifikasi".</p>

<h2>Topeng sebagai Teks Hukum yang Hidup</h2>
<p>Setiap karakter dalam Topeng Bali — dari Topeng Tua yang bijaksana hingga Topeng Keras yang tegas — merepresentasikan hierarki sosial, kewajiban moral, dan sanksi adat yang berlaku dalam masyarakat. Penari bukan sekadar seniman; ia adalah penjaga konstitusi tak tertulis.</p>

<h2>Implikasi terhadap Hukum Positif</h2>
<p>Pertanyaan yang selalu menarik untuk dikaji: sejauh mana nilai-nilai yang terkandung dalam tradisi Topeng Bali dapat menjadi sumber hukum yang diakui dalam sistem hukum nasional Indonesia? UU No. 5 Tahun 2017 tentang Pemajuan Kebudayaan membuka ruang yang menarik untuk didiskusikan lebih lanjut.</p>

<p>[Lanjutkan artikel dengan perspektif dan analisis Anda...]</p>`,
      published: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      tags: { connect: [{ name: "Hukum Adat" }, { name: "Topeng Bali" }] },
    },
  });

  await prisma.post.upsert({
    where: { slug: "kedudukan-hukum-seni-tradisi-di-era-digital" },
    update: {},
    create: {
      title: "Kedudukan Hukum Seni Tradisi di Era Digital",
      slug: "kedudukan-hukum-seni-tradisi-di-era-digital",
      excerpt:
        "Ketika Topeng Bali diunggah ke platform streaming dan dikomersialisasi tanpa izin komunitas adat, hukum manakah yang berwenang melindungi?",
      content: `<p>Era digital menghadirkan paradoks bagi seni tradisi: di satu sisi memperluas jangkauan, di sisi lain membuka celah eksploitasi yang belum memiliki payung hukum yang memadai.</p>

<h2>Hak Kekayaan Intelektual vs. Hak Komunal</h2>
<p>Sistem Hak Kekayaan Intelektual (HKI) yang ada saat ini dirancang untuk melindungi karya individual. Sementara itu, Topeng Bali adalah milik komunal — ia lahir dari, oleh, dan untuk komunitas adat. Siapa yang berhak mendaftarkan hak cipta atas sebuah topeng yang telah ada selama 700 tahun?</p>

<p>[Lanjutkan artikel dengan perspektif dan analisis Anda...]</p>`,
      published: true,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      tags: { connect: [{ name: "Hukum" }, { name: "Budaya Bali" }, { name: "Riset" }] },
    },
  });

  await prisma.post.upsert({
    where: { slug: "filosofi-dualisme-dalam-topeng-sidakarya" },
    update: {},
    create: {
      title: "Filosofi Dualisme dalam Topeng Sidakarya",
      slug: "filosofi-dualisme-dalam-topeng-sidakarya",
      excerpt:
        "Topeng Sidakarya menyimpan filsafat yang melampaui estetika — ia berbicara tentang keseimbangan, keadilan, dan penyelesaian yang sempurna.",
      content: `<p>Di antara semua karakter dalam repertoar Topeng Bali, Sidakarya memiliki kedudukan yang paling istimewa. Ia bukan sekadar penari penutup — ia adalah simbol "karya yang sempurna", penyelesaian dari sebuah ritual yang dimulai.</p>

<h2>Makna Filosofis</h2>
<p>Kata "Sidakarya" berasal dari "sida" (berhasil/sempurna) dan "karya" (pekerjaan/ritual). Dalam konteks hukum adat, ini berbicara tentang pentingnya penyelesaian — bahwa setiap konflik, setiap perkara, harus diselesaikan hingga tuntas, hingga semua pihak merasa "sida" — selesai dengan sempurna.</p>

<p>[Lanjutkan artikel dengan perspektif dan analisis Anda...]</p>`,
      published: false,
      publishedAt: null,
      tags: { connect: [{ name: "Topeng Bali" }, { name: "Budaya Bali" }, { name: "Opini" }] },
    },
  });

  console.log("✓ Seed selesai — 6 tags, 3 artikel (2 published, 1 draft)");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
