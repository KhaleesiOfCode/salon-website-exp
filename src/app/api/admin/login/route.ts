import { NextResponse } from "next/server";
import { getAdminPassword, generateSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    if (!password) {
      return NextResponse.json({ error: "Password richiesta" }, { status: 400 });
    }
    if (password !== getAdminPassword()) {
      return NextResponse.json({ error: "Password errata" }, { status: 401 });
    }
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", generateSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
}
