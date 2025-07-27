import { requireAuth } from "@lib/requireAuth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;
  const { id } = await params;

  try {
    const yarn = await prisma.yarn.findUnique({
      where: { id: Number(id) },
    });

    if (!yarn) {
      return NextResponse.json({ error: "Yarn not found" }, { status: 404 });
    }

    if (yarn.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.yarn.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Yarn deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting yarn:", error);
    return NextResponse.json(
      { error: "Failed to delete yarn" },
      { status: 500 }
    );
  }
}
