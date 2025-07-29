"use client";

import { useState, useRef, useEffect } from "react";
import Logout from "@components/Logout";
import { FaUserLarge } from "react-icons/fa6";

type UserDropdownProps = {
  image?: string | null;
};

const UserDropdown = ({ image }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center space-x-2 cursor-pointer"
      >
        {image ? (
          <img
            src={image}
            alt="User Avatar"
            className="w-6 h-6 rounded-full object-cover hover:scale-108 transition-transform duration-200"
          />
        ) : (
          <FaUserLarge
            className="hover:scale-108 transition-transform duration-200"
            title="User Avatar"
          />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-30 text-center bg-white border rounded shadow-md border-gray-300 z-50 p-2">
          <Logout />
        </div>
      )}
    </span>
  );
};

export default UserDropdown;
