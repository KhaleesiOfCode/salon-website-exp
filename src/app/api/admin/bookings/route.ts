import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const where = status ? { status } : {};

  const bookings = await prisma.booking.findMany({
    where,
    include: { service: true },
    orderBy: [{ date: "desc" }, { time: "desc" }],
  });

  const allServiceIds = bookings.flatMap((b) => {
    try {
      return JSON.parse(b.allServiceIds) as number[];
    } catch {
      return [b.serviceId];
    }
  });

  const allServices = await prisma.service.findMany({
    where: { id: { in: [...new Set(allServiceIds)] } },
    select: { id: true, name: true, duration: true, price: true },
  });

  const serviceMap = Object.fromEntries(allServices.map((s) => [s.id, s]));

  const enriched = bookings.map((b) => {
    let ids: number[];
    try {
      ids = JSON.parse(b.allServiceIds) as number[];
    } catch {
      ids = [b.serviceId];
    }
    const services = ids.map((id) => serviceMap[id]).filter(Boolean);
    return {
      ...b,
      totalDuration: b.totalDuration,
      totalPrice: b.totalPrice,
      allServiceIds: JSON.stringify(ids),
      services,
    };
  });

  return NextResponse.json(enriched);
}
