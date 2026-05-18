import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date") || new Date().toISOString().split("T")[0];

  const dayStart = new Date(dateStr + "T00:00:00");
  const dayEnd = new Date(dateStr + "T23:59:59");

  const [services, bookings, serviceCount] = await Promise.all([
    prisma.service.findMany({ where: { active: true } }),
    prisma.booking.findMany({
      where: { date: { gte: dayStart, lte: dayEnd } },
      include: { service: true },
    }),
    prisma.service.count(),
  ]);

  return NextResponse.json({
    date: dateStr,
    serviceCount,
    services: services.map((s) => ({ id: s.id, name: s.name, duration: s.duration })),
    bookingsCount: bookings.length,
    bookings: bookings.map((b) => ({
      id: b.id,
      time: b.time,
      totalDuration: b.totalDuration,
      serviceName: b.service?.name ?? "(deleted)",
      serviceDuration: b.service?.duration ?? 0,
      status: b.status,
    })),
    totalSelectedDuration: services.reduce((s, x) => s + x.duration, 0),
    workSlots: generateSlots(),
  });
}

function generateSlots() {
  const slots: string[] = [];
  for (let h = 9; h < 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}
