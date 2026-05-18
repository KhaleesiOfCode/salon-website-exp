import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { status },
      include: { service: true },
    });

    return NextResponse.json(booking);
  } catch {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
}
