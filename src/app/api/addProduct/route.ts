import { requireAuth } from "@lib/requireAuth";
import { inventorySchema } from "@lib/schemas/inventorySchema";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;

  try {
    const rawData = await request.json();

    const result = inventorySchema.safeParse(rawData);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.flatten() }), {
        status: 400,
      });
    }

    const validData = result.data;

    const {
      name,
      craft,
      category,
      size,
      value,
      price,
      qty,
      status,
      notes,
      recipient,
      shippingTier,
      yarnUsed,
      variant,
      sku,
    } = validData;

    await prisma.$transaction(async (tx) => {
      // Create the new inventory record
      const newInventory = await tx.inventory.create({
        data: {
          userId,
          name,
          craft,
          category,
          size,
          qty,
          notes,
          status,
          recipient,
          value,
          price,
          shippingTier,
          variant,
          sku,
        },
      });

      // Use the new inventory's id to connect yarn used
      await tx.inventory.update({
        where: { id: newInventory.id },
        data: {
          yarnUsed: {
            create: yarnUsed.map((id) => ({
              yarn: { connect: { id: parseInt(id, 10) } },
            })),
          },
        },
      });

      return newInventory;
    });

    return NextResponse.json({
      message: "New product added successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
        status: "error",
      },
      { status: 500 }
    );
  }
}
