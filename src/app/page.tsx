import { requireAuth } from "@lib/requireAuth";
import Landing from "@components/Landing";
import Home from "@components/Home";
import { NextResponse } from "next/server";

const Homepage = async () => {
  const session = await requireAuth();

  if (session instanceof NextResponse) {
    return <Landing />;
  }

  return <Home username={session.user.name} />;
};

export default Homepage;
