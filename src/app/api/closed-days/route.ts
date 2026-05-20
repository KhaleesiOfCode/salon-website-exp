import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const closedDays = await prisma.closedDay.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json(closedDays);
}
