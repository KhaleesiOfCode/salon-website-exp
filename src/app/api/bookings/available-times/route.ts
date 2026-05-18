import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const WORK_START = 9;
const WORK_END = 18;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");
    const serviceIdsParam = searchParams.get("serviceIds");

    if (!dateStr || !serviceIdsParam) {
      return NextResponse.json(
        { error: "date and serviceIds are required" },
        { status: 400 }
      );
    }

    const ids = serviceIdsParam.split(",").map(Number).filter(Boolean);
    if (ids.length === 0) {
      return NextResponse.json({ error: "Invalid serviceIds" }, { status: 400 });
    }

    const services = await prisma.service.findMany({
      where: { id: { in: ids }, active: true },
    });

    if (services.length === 0) {
      return NextResponse.json({ error: "No valid services found" }, { status: 404 });
    }

    const totalDuration = services.reduce((sum, s) => sum + s.duration, 0);
    const dayStart = new Date(dateStr + "T00:00:00");
    const dayEnd = new Date(dateStr + "T23:59:59");

    const existingBookings = await prisma.booking.findMany({
      where: {
        date: { gte: dayStart, lte: dayEnd },
        status: { not: "cancelled" },
      },
      select: { time: true, totalDuration: true, service: { select: { duration: true } } },
    });

    const slots: string[] = [];
    const busyMap = new Map<string, number>();

    for (const b of existingBookings) {
      const bookingDur = b.totalDuration > 0 ? b.totalDuration : (b.service?.duration ?? 30);
      const startMin = timeToMinutes(b.time);
      for (let m = 0; m < bookingDur; m += 30) {
        const t = minutesToTime(startMin + m);
        busyMap.set(t, (busyMap.get(t) || 0) + 1);
      }
    }

    for (let h = WORK_START; h < WORK_END; h++) {
      for (let m = 0; m < 60; m += 30) {
        const slotMin = h * 60 + m;
        const slotStart = minutesToTime(slotMin);
        let conflict = false;
        for (let offset = 0; offset < totalDuration; offset += 30) {
          if (busyMap.has(minutesToTime(slotMin + offset))) {
            conflict = true;
            break;
          }
        }
        if (!conflict) {
          slots.push(slotStart);
        }
      }
    }

    return NextResponse.json(slots);
  } catch (err) {
    console.error("available-times error:", err);
    return NextResponse.json({ error: "Internal error", detail: String(err) }, { status: 500 });
  }
}

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
