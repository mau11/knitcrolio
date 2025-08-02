import { auth } from "@auth";
import { UserSession } from "@custom-types/user";
import { NextResponse } from "next/server";

export const requireAuth = async (): Promise<UserSession | NextResponse> => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return session as UserSession;
};
