import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";
// GET /api/blog — daftar semua artikel (admin only)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { tags: true },
  });

  return NextResponse.json(posts);
}

// POST /api/blog — buat artikel baru
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, excerpt, content, published, tags, featuredImage, category } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title dan content wajib diisi" }, { status: 400 });
  }

  const slug = generateSlug(title);

  const tagConnections = tags?.length
    ? await Promise.all(
        (tags as string[]).map((name: string) =>
          prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
          })
        )
      )
    : [];

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featuredImage: featuredImage || null,
      category: (category === "CULTURE" ? "CULTURE" : "LAW") as "LAW" | "CULTURE",
      published: published ?? false,
      publishedAt: published ? new Date() : null,
      tags: {
        connect: tagConnections.map((t) => ({ id: t.id })),
      },
    },
    include: { tags: true },
  });

  return NextResponse.json(post, { status: 201 });
}
