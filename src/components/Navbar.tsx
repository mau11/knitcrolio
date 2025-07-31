"use client";

import Link from "next/link";
import Login from "@components/Login";
import UserDropdown from "@components/UserDropdown";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import Logout from "@components/Logout";
import { useOutsideClick } from "@hooks/useOutsideClick";

type SessionProps = {
  session: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
};

const Navbar = ({ session }: SessionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, toggleMenu, isOpen);

  return (
    <nav className="w-full pt-4 pb-2 border-b border-gray-200 flex justify-between items-center">
      <Link href="/" className="text-4xl text-aqua font-leckerli">
        Knitcrolio
      </Link>

      {/* Desktop navbar menu */}
      <div className="hidden md:flex">
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

      {/* Mobile navbar toggle */}
      <div className="flex md:hidden cursor-pointer">
        <button
          onClick={toggleMenu}
          className="lg:hidden text-2xl text-gray-800"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile navbar menu */}
      <div
        ref={ref}
        className={`
          absolute top-16 right-4 w-64 flex flex-col text-center bg-white border rounded-md shadow-md border-aqua-100 z-50 md:hidden sm:right-8 transition-all duration-300 ease-in
          transform origin-top-right
          ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-70 opacity-0 pointer-events-none"
          }
        `}
      >
        {session?.user ? (
          <>
            <Link
              href="/yarn"
              className="py-3 px-6 w-full text-center hover:bg-aqua-50 transition"
              onClick={() => setIsOpen(false)}
            >
              Yarn Stash
            </Link>
            <Link
              href="/inventory"
              className="py-3 px-6 w-full text-center hover:bg-aqua-50 transition"
              onClick={() => setIsOpen(false)}
            >
              Inventory
            </Link>
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
