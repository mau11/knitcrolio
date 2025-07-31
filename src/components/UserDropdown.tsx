"use client";

import { useState, useRef } from "react";
import Logout from "@components/Logout";
import { FaUserLarge } from "react-icons/fa6";
import { useOutsideClick } from "@hooks/useOutsideClick";

type UserDropdownProps = {
  image?: string | null;
};

const UserDropdown = ({ image }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useOutsideClick(ref, toggleDropdown, isOpen);

  return (
    <span className="relative" ref={ref}>
      <button
        onClick={toggleDropdown}
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

      <div
        className={`absolute right-0 mt-2 w-30 text-center bg-white border rounded shadow-md
          border-aqua-100 z-50 p-2 transition-all duration-300 ease-in transform origin-top-right
          ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-70 opacity-0 pointer-events-none"
          }
        `}
      >
        <Logout />
      </div>
    </span>
  );
};

export default UserDropdown;
