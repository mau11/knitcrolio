import { yarnSchema } from "@lib/schemas/yarnSchema";
import { PrismaClient, Yarn } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data: Yarn = await request.json();

    const result = yarnSchema.safeParse(data);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.flatten() }), {
        status: 400,
      });
    }

    const validData = result.data;

    const { brand, yarnType, color, colorFamily, weight, material, qty } =
      validData;
    if (
      !brand ||
      !yarnType ||
      !color ||
      !colorFamily ||
      !weight ||
      !material ||
      !qty
    ) {
      return NextResponse.json(
        {
          message: "All required fields must be filled.",
          status: "error",
        },
        { status: 400 }
      );
    }

    await prisma.yarn.create({ data: validData });
    return NextResponse.json({
      message: "New yarn added successfully",
      status: "success",
    });
  } catch (error) {
    console.error("Error creating yarn:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        status: "error",
      },
      { status: 500 }
    );
  }
}
