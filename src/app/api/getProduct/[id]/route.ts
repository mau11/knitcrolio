import { requireAuth } from "@lib/requireAuth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;
  const { id } = await params;

  try {
    const inventory = await prisma.inventory.findUnique({
      where: { id: Number(id), userId },
      include: {
        yarnUsed: {
          select: {
            yarnId: true,
          },
        },
      },
    });

    if (!inventory) {
      return NextResponse.json(
        { message: "Not authorized to view this product" },
        { status: 403 }
      );
    }

    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Error fetching product inventory:", error);
    return NextResponse.error();
  }
}
