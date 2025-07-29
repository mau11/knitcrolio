import Link from "next/link";
import { auth } from "@auth";
import Login from "@components/Login";
import UserDropdown from "@components/UserDropdown";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="w-full pt-4 pb-2 border-b border-gray-200 flex justify-between items-center">
      <Link href="/" className="text-4xl text-aqua font-leckerli">
        knitcrolio
      </Link>
      {/* Desktop navbar */}
      <div>
        {session?.user ? (
          <div className="flex gap-4 items-center">
            <Link className="hover:font-semibold" href="/yarn">
              Yarn Stash
            </Link>
            <Link className="hover:font-semibold" href="/inventory">
              Inventory
            </Link>
            <UserDropdown image={session.user.image} />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
