import { requireAuth } from "@lib/auth";
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

  const { id } = await params;
  const data: Yarn = await request.json();

  const result = yarnSchema.safeParse(data);

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error.flatten() }), {
      status: 400,
    });
  }

  const validData = result.data;

  try {
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
