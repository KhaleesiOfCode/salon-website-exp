import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerImage, rating, text } = body;
    if (!customerName || !text) {
      return NextResponse.json({ error: "customerName and text are required" }, { status: 400 });
    }
    const review = await prisma.review.create({
      data: {
        customerName,
        customerImage,
        rating: rating || 5,
        text,
      },
    });
    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
