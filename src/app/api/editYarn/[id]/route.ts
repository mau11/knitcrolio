import { PrismaClient, Yarn } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = await params;
  const data: Yarn = await request.json();

  try {
    await prisma.yarn.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json(
      { message: "Yarn edited successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing yarn:", error);
    return NextResponse.json({ error: "Failed to edit yarn" }, { status: 500 });
  }
}
