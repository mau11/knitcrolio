import { requireAuth } from "@lib/requireAuth";
import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: number } }
) {
  const session = await requireAuth();
  if (session instanceof NextResponse) return session;

  const userId = session.user.id;
  const { id } = await params;

  try {
    const product = await prisma.inventory.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.inventory.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
