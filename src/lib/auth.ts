import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import crypto from "crypto";

function hashToken(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function getAuthSecret(): string {
  return process.env.AUTH_SECRET || "fallback-secret";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin";
}

export function generateSessionToken(): string {
  const secret = getAuthSecret();
  return hashToken(secret + new Date().toDateString());
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  return token === generateSessionToken();
}

export function isAuthenticatedFromRequest(request: NextRequest): boolean {
  const token = request.cookies.get("admin_session")?.value;
  if (!token) return false;
  return token === generateSessionToken();
}
