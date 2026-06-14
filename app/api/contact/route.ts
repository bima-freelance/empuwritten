import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
  }

  const contact = await prisma.contactMessage.create({
    data: { name, email, message },
  });

  return NextResponse.json(contact, { status: 201 });
}
