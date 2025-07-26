import { auth } from "@auth";
import { NextResponse } from "next/server";

export const requireAuth = async () => {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return session;
};
