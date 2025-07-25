import Link from "next/link";
import { auth } from "@auth";
import Login from "@components/Login";
import Logout from "@components/Logout";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="w-full pt-4 pb-2 border-b border-gray-200 flex justify-between items-center">
      <Link href="/" className="text-4xl text-aqua font-leckerli">
        Knitcrolio
      </Link>
      <div className="space-x-8 ">
        {/* Session-based login/logout buttons */}
        {session?.user ? (
          <>
            <Link className="hover:font-semibold" href="/yarn">
              Yarn Stash
            </Link>
            <Link className="hover:font-semibold" href="/inventory">
              Inventory
            </Link>
            <span className="text-sm text-gray-700">
              Welcome, {session.user.name}
            </span>
            <Logout />
          </>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
