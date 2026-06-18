import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    email: process.env.ADMIN_EMAIL,
    passwordFirst10: process.env.ADMIN_PASSWORD?.slice(0, 10),
    passwordLength: process.env.ADMIN_PASSWORD?.length,
    secret: process.env.NEXTAUTH_SECRET?.slice(0, 5),
  });
}
