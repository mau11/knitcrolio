import { requireAuth } from "@lib/requireAuth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;

  try {
    const inventory = await prisma.inventory.findMany({
      where: { userId },
    });

    if (!inventory) {
      return NextResponse.json(
        { message: "Not authorized to view products" },
        { status: 403 }
      );
    }

    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Error fetching product inventory:", error);
    return NextResponse.error();
  }
}
