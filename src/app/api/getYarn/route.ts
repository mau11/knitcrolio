import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stash = await prisma.yarn.findMany();
    return NextResponse.json(stash);
  } catch (error) {
    console.error("Error fetching yarn stash:", error);
    return NextResponse.error();
  }
}
