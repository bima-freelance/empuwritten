import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/utils";
interface Params {
  params: { id: string };
}

// GET /api/blog/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const post = await prisma.post.findUnique({
    where: { id: Number(params.id) },
    include: { tags: true },
  });

  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

// PUT /api/blog/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, excerpt, content, published, tags, featuredImage, category } = body;

  const existing = await prisma.post.findUnique({ where: { id: Number(params.id) } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const wasPublished = existing.published;
  const newSlug = title ? generateSlug(title) : existing.slug;

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

  const post = await prisma.post.update({
    where: { id: Number(params.id) },
    data: {
      title: title ?? existing.title,
      slug: newSlug,
      excerpt: excerpt ?? existing.excerpt,
      content: content ?? existing.content,
      featuredImage: featuredImage !== undefined ? (featuredImage || null) : existing.featuredImage,
      category: (category === "CULTURE" ? "CULTURE" : category === "LAW" ? "LAW" : existing.category) as "LAW" | "CULTURE",
      published: published ?? existing.published,
      publishedAt: published && !wasPublished ? new Date() : existing.publishedAt,
      tags: {
        set: tagConnections.map((t) => ({ id: t.id })),
      },
    },
    include: { tags: true },
  });

  return NextResponse.json(post);
}

// DELETE /api/blog/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.post.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Artikel dihapus" });
}
