import { inventorySchema } from "@lib/schemas/inventorySchema";
import { PrismaClient, Inventory } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const { id } = await params;
  const data: Inventory = await request.json();

  const result = inventorySchema.safeParse(data);

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error.flatten() }), {
      status: 400,
    });
  }

  const validData = result.data;

  try {
    await prisma.inventory.update({
      where: { id: Number(id) },
      data: validData,
    });

    return NextResponse.json(
      { message: "Product edited successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing product:", error);
    return NextResponse.json(
      { error: "Failed to edit product" },
      { status: 500 }
    );
  }
}
