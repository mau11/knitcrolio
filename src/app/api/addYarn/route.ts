import { PrismaClient, Yarn } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data: Yarn = await request.json();
    const { brand, yarnType, color, colorFamily, weight, material, qty } = data;
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

    await prisma.yarn.create({ data });
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
