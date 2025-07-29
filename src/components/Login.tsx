"use client";

import { loginAction } from "@actions/login";

const Login = () => {
  return (
    <form action={loginAction}>
      <button type="submit" className="hover:font-semibold cursor-pointer">
        Login
      </button>
    </form>
  );
};

export default Login;
