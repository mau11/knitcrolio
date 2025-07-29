"use client";

import { logoutAction } from "@actions/logout";

const Logout = () => {
  return (
    <form action={logoutAction} className="">
      <button type="submit" className="hover:font-semibold cursor-pointer">
        Log out
      </button>
    </form>
  );
};

export default Logout;
