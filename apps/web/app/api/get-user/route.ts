import { auth } from "@repo/auth/checkAuth";
import { decode, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authResult = await auth();
    if (!authResult) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const AuthSecret = process.env.NEXTAUTH_SECRET;
    if (!AuthSecret) {
      return NextResponse.json({
        success: false,
        message: "Invalid Auth Secret",
      });
    }

    const rawToken = await getToken({ req, secret: AuthSecret, raw: true });
    if (!rawToken) {
      return NextResponse.json(
        { success: false, message: "No token found" },
        { status: 404 }
      );
    }

    const decodedToken = await decode({ token: rawToken, secret: AuthSecret });
    return NextResponse.json({
      success: true,
      rawToken: rawToken,
      decodedToken: decodedToken ?? "Decryption failed",
    });
  } catch (error) {
    console.error("Something went wrong.", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process token",
      },
      { status: 500 }
    );
  }
}
