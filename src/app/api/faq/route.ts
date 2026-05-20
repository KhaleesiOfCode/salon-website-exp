import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(faqs);
}
