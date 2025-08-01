"use client";

import { loginAction } from "@actions/login";
import { Button } from "@components/Button";

const Login = () => {
  return (
    <form action={loginAction}>
      <Button type="submit" text="Log In to Your Account" ariaLabel="Login" />
    </form>
  );
};

export default Login;
