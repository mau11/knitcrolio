import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;

    const inventory = await prisma.inventory.findUnique({
      where: { id: Number(id) },
      include: {
        yarnUsed: {
          select: {
            yarnId: true,
          },
        },
      },
    });
    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Error fetching product inventory:", error);
    return NextResponse.error();
  }
}
