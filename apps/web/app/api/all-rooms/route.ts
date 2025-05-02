import { auth } from "@repo/auth/checkAuth";
import prisma from "@repo/db/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authResult = await auth();
    if (!authResult) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const allRooms = await prisma.room.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "Rooms fetched successfuly",
        allRooms,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Something went wrong", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
