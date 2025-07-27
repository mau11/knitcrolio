import { requireAuth } from "@lib/requireAuth";
import { yarnSchema } from "@lib/schemas/yarnSchema";
import { PrismaClient, Yarn } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;
  const { id } = await params;

  try {
    const data: Yarn = await request.json();

    const result = yarnSchema.safeParse(data);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.flatten() }), {
        status: 400,
      });
    }

    const validData = result.data;

    const yarn = await prisma.yarn.findUnique({
      where: { id: Number(id) },
      select: { userId: true },
    });

    if (!yarn || yarn.userId !== userId) {
      return NextResponse.json(
        { message: "Forbidden: You do not have access to edit this yarn." },
        { status: 403 }
      );
    }

    await prisma.yarn.update({
      where: { id: Number(id) },
      data: validData,
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
