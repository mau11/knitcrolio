"use server";

import { signIn } from "@auth";

export const loginAction = async () => {
  await signIn("google");
};
