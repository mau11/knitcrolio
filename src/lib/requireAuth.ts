import { auth } from "@auth";
import { NextResponse } from "next/server";

type UserSession = {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
};

export const requireAuth = async (): Promise<UserSession | NextResponse> => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return session as UserSession;
};
