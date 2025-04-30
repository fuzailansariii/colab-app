import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function getAuthStatus(request: NextRequest) {
  const token = await getToken({ req: request, secret });
  const isAuthenticated = !!token;
  return { token, isAuthenticated };
}
