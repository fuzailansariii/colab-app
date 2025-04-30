import { NextAuthOptions } from "next-auth";
import prisma from "@repo/db/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email.trim();
          const password = credentials?.password.trim();

          //   if any or input is empty
          if (!email || !password) {
            throw new Error("Invalid Inputs");
          }

          //   check if user already exist
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          //   if no user found
          if (!user) {
            throw new Error("Incorrect email!");
          }

          //   if found then check password and return the values
          const isMatched = await bcrypt.compare(password, user.password);
          if (!isMatched) {
            throw new Error("Incorrect Password");
          }
          return {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.fullName = token.fullName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
