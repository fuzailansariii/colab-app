import { auth } from "@repo/auth/checkAuth";
import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

interface ParamProp {
  params: {
    roomId: string;
  };
}

export async function DELETE(_request: NextRequest, { params }: ParamProp) {
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
    const { userId } = authResult;

    const roomId = params.roomId;

    if (!roomId || typeof params.roomId !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid roomId",
        },
        { status: 400 }
      );
    }
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          message: "Room not found",
        },
        {
          status: 404,
        }
      );
    }

    const isAdmin = room.createdBy === userId;
    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    await prisma.room.delete({
      where: {
        id: roomId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Room deleted successfully",
        deletedRoomId: room.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server Error",
      },
      { status: 500 }
    );
  }
}
