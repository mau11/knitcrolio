import { requireAuth } from "@lib/requireAuth";
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;

  try {
    const { id } = await params;

    const stash = await prisma.yarn.findUnique({
      where: { id: Number(id), userId },
    });

    if (!stash) {
      return NextResponse.json(
        { message: "Not authorized to view this yarn" },
        { status: 403 }
      );
    }

    return NextResponse.json(stash);
  } catch (error) {
    console.error("Error fetching yarn stash:", error);
    return NextResponse.error();
  }
}
