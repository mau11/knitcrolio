import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany();
    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Error fetching product inventory:", error);
    return NextResponse.error();
  }
}
