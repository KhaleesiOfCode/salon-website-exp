import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { customerName, customerImage, rating, text, active } = body;
    const review = await prisma.review.update({
      where: { id: Number(id) },
      data: {
        ...(customerName !== undefined && { customerName }),
        ...(customerImage !== undefined && { customerImage }),
        ...(rating !== undefined && { rating }),
        ...(text !== undefined && { text }),
        ...(active !== undefined && { active }),
      },
    });
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.review.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }
}
