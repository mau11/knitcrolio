import { inventorySchema } from "@lib/schemas/inventorySchema";
import { PrismaClient, Inventory } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { id } = await params;
    const data: Inventory = await request.json();

    const result = inventorySchema.safeParse(data);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.flatten() }), {
        status: 400,
      });
    }

    const { yarnUsed, ...validData } = result.data;
    const inventoryId = Number(id);

    await prisma.$transaction(async (tx) => {
      // Update the inventory data
      await tx.inventory.update({
        where: { id: inventoryId },
        data: validData,
      });

      // Disconnect existing yarn associations for this inventory item
      await tx.yarnOnInventory.deleteMany({
        where: {
          inventoryId: inventoryId,
        },
      });

      // Connect the newly selected yarn list
      await tx.inventory.update({
        where: { id: Number(id) },
        data: {
          yarnUsed: {
            create: yarnUsed.map((id) => ({
              yarn: { connect: { id: parseInt(id, 10) } },
            })),
          },
        },
      });
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
