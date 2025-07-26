import { requireAuth } from "@lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  try {
    const { id } = await params;

    const stash = await prisma.yarn.findUnique({ where: { id: Number(id) } });
    return NextResponse.json(stash);
  } catch (error) {
    console.error("Error fetching yarn stash:", error);
    return NextResponse.error();
  }
}
