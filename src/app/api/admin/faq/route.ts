import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, category, sortOrder } = body;
    if (!question || !answer) {
      return NextResponse.json({ error: "question and answer are required" }, { status: 400 });
    }
    const faq = await prisma.fAQ.create({
      data: { question, answer, category: category || "Generale", sortOrder: sortOrder || 0 },
    });
    return NextResponse.json(faq, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
