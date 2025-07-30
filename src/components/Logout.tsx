"use client";

import { logoutAction } from "@actions/logout";

const Logout = () => {
  return (
    <form action={logoutAction} className="w-full md:w-auto ">
      <button
        type="submit"
        className="
        cursor-pointer py-3 px-6 w-full text-center hover:bg-aqua-50 transition
        md:py-1 md:px-4 md:w-auto md:hover:font-semibold md:hover:bg-transparent"
      >
        Log out
      </button>
    </form>
  );
};

export default Logout;
