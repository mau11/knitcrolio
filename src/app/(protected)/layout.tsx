import { requireAuth } from "@lib/requireAuth";
import { redirect } from "next/navigation";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await requireAuth();

  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
