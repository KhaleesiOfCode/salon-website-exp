import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, role, bio, image, sortOrder, active } = body;
    const member = await prisma.staffMember.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role }),
        ...(bio !== undefined && { bio }),
        ...(image !== undefined && { image }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(active !== undefined && { active }),
      },
    });
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.staffMember.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Staff member not found" }, { status: 404 });
  }
}
