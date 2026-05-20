import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const staff = await prisma.staffMember.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(staff);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, bio, image, sortOrder } = body;
    if (!name || !role) {
      return NextResponse.json({ error: "name and role are required" }, { status: 400 });
    }
    const member = await prisma.staffMember.create({
      data: { name, role, bio, image, sortOrder: sortOrder || 0 },
    });
    return NextResponse.json(member, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
