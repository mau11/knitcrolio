"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full pt-4 pb-2 border-b border-gray-200 flex justify-between items-center">
      <Link href="/" className="text-4xl text-aqua font-leckerli">
        Knitcrolio
      </Link>
      <div className="space-x-8">
        <Link href="/yarn">Yarn Stash</Link>
        <Link href="/inventory">Inventory</Link>
      </div>
    </nav>
  );
};

export default Navbar;
