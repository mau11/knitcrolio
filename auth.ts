import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Using PrismaAdapter signs in existing users or automatically creates a new user if needed
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      return true;
    },
  },
});
