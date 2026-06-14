# Personal Profile Website

Website personal profile full-stack dibangun dengan Next.js App Router, PostgreSQL, dan Prisma ORM.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **Language**: TypeScript

## Project Structure

```
/
├── app/
│   ├── (public)/               # Route group untuk halaman publik
│   │   ├── page.tsx            # Beranda — ringkasan profil
│   │   ├── about/
│   │   │   └── page.tsx        # About — personal profile detail
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog — daftar artikel
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Detail artikel
│   │   └── contact/
│   │       └── page.tsx        # Contact — informasi kontak
│   ├── admin/                  # Admin panel (protected)
│   │   ├── layout.tsx          # Layout admin dengan auth guard
│   │   ├── page.tsx            # Dashboard admin
│   │   └── blog/
│   │       ├── page.tsx        # Daftar artikel (admin)
│   │       ├── new/
│   │       │   └── page.tsx    # Buat artikel baru
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.tsx # Edit artikel
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts    # NextAuth handler
│   │   └── blog/
│   │       ├── route.ts        # GET /api/blog, POST /api/blog
│   │       └── [id]/
│   │           └── route.ts    # GET, PUT, DELETE /api/blog/[id]
│   ├── layout.tsx              # Root layout
│   └── globals.css
├── components/
│   ├── ui/                     # Komponen UI dasar (Button, Card, dll)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Nav.tsx
│   └── blog/
│       ├── ArticleCard.tsx
│       └── ArticleEditor.tsx
├── lib/
│   ├── prisma.ts               # Prisma client singleton
│   ├── auth.ts                 # NextAuth config
│   └── utils.ts                # Helper functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
├── public/
│   └── images/
├── .env.local                  # Environment variables (tidak di-commit)
├── .env.example                # Template env vars
└── next.config.ts
```

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id          Int       @id @default(autoincrement())
  title       String
  slug        String    @unique
  excerpt     String?
  content     String
  published   Boolean   @default(false)
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  tags        Tag[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

model ContactMessage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
  read      Boolean  @default(false)
}
```

## Environment Variables

Buat file `.env.local` (jangan di-commit):

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/personal_profile"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Admin credentials (atau gunakan OAuth provider)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="hashed-password"
```

## Commands

```bash
# Install dependencies
npm install

# Setup database
npx prisma migrate dev --name init
npx prisma generate

# Seed database
npx prisma db seed

# Development
npm run dev

# Build production
npm run build
npm start

# Prisma Studio (GUI database)
npx prisma studio

# Format & lint
npm run lint
npm run format
```

## Pages

### Beranda (`/`)
- Hero section dengan nama dan tagline
- Ringkasan singkat tentang diri
- Featured posts (3 artikel terbaru)
- Link ke halaman about dan blog

### About (`/about`)
- Foto profil
- Bio lengkap
- Skills / keahlian
- Pengalaman atau pendidikan

### Blog (`/blog`)
- Daftar semua artikel yang sudah dipublish
- Filter by tag
- Pagination

### Blog Detail (`/blog/[slug]`)
- Konten artikel lengkap
- Metadata (tanggal publish, tags)
- Navigasi prev/next artikel

### Contact (`/contact`)
- Informasi kontak (email, sosial media, dll)
- Form kirim pesan (tersimpan ke database via `ContactMessage`)

### Admin Panel (`/admin`) — Protected
- Login menggunakan NextAuth (credentials provider)
- Dashboard ringkasan
- CRUD artikel (tambah, edit, hapus, publish/unpublish)
- Daftar pesan masuk dari form kontak

## Authentication

Admin panel dilindungi dengan NextAuth.js menggunakan Credentials Provider. Hanya satu user admin.

- Route `/admin/*` diproteksi via middleware (`middleware.ts`) yang cek session
- Session strategy: `jwt`

## Key Conventions

- Semua Server Components secara default; gunakan `"use client"` hanya jika perlu interaktivitas
- Data fetching langsung dari Server Components menggunakan Prisma (tidak perlu API route untuk read)
- API routes hanya untuk mutasi dari client (POST, PUT, DELETE)
- Slug artikel di-generate otomatis dari title
- Konten artikel menggunakan Markdown atau rich text editor (TipTap/Quill)

## Prisma Client Singleton

```ts
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```
