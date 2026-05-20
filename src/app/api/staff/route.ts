import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const staff = await prisma.staffMember.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(staff);
}
