import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string;
    fullName?: string;
  }
  interface Session {
    user: {
      id?: string;
      email?: string;
      fullName?: string;
    } & DefaultSession["user"];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    fullName?: string;
    accessToken?: string;
  }
}
