import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceIds, customerName, customerEmail, customerPhone, staffName, date, time, notes } = body;

    if (!serviceIds?.length || !customerName || !customerEmail || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds.map(Number) }, active: true },
    });

    if (services.length === 0) {
      return NextResponse.json(
        { error: "No valid services selected" },
        { status: 404 }
      );
    }

    const totalDuration = services.reduce((sum, s) => sum + s.duration, 0);
    const totalPrice = services.reduce((sum, s) => sum + s.price, 0);
    const bookingDate = new Date(date + "T00:00:00");

    const booking = await prisma.booking.create({
      data: {
        serviceId: services[0].id,
        allServiceIds: JSON.stringify(serviceIds.map(Number)),
        totalDuration,
        totalPrice,
        customerName,
        customerEmail,
        customerPhone,
        staffName: staffName || "",
        date: bookingDate,
        time,
        notes,
        status: "pending",
      },
      include: { service: true },
    });

    return NextResponse.json({
      ...booking,
      services: services.map((s) => ({ name: s.name, price: s.price, duration: s.duration })),
    }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
