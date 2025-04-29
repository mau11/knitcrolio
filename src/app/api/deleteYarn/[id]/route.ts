import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const { id } = await params;

  try {
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
