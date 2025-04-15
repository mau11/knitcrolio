"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full pt-4 pb-2 border-b border-gray-200 flex justify-between items-center">
      <Link href="/" className="text-4xl font-bold text-aqua font-leckerli">
        Knitcrolio
      </Link>
      <div className="space-x-8">
        <Link href="/projects">Projects</Link>
        <Link href="/stash">Stash</Link>
      </div>
    </nav>
  );
};

export default Navbar;
