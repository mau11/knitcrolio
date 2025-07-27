import { requireAuth } from "@lib/requireAuth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;

  try {
    const stash = await prisma.yarn.findMany({
      where: { userId },
    });

    if (!stash) {
      return NextResponse.json(
        { message: "Not authorized to view yarn stash" },
        { status: 403 }
      );
    }

    return NextResponse.json(stash);
  } catch (error) {
    console.error("Error fetching yarn stash:", error);
    return NextResponse.error();
  }
}
