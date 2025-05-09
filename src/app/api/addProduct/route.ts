import { inventorySchema } from "@lib/schemas/inventorySchema";
import { Inventory, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data: Inventory = await request.json();

    const result = inventorySchema.safeParse(data);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.flatten() }), {
        status: 400,
      });
    }

    const validData = result.data;

    const { name, craft, category, size, value, price, qty, status } =
      validData;
    if (
      !name ||
      !craft ||
      !category ||
      !size ||
      !value ||
      !price ||
      !qty ||
      !status
    ) {
      return NextResponse.json(
        {
          message: "All required fields must be filled.",
          status: "error",
        },
        { status: 400 }
      );
    }

    await prisma.inventory.create({ data: validData });
    return NextResponse.json({
      message: "New product added successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        status: "error",
      },
      { status: 500 }
    );
  }
}
