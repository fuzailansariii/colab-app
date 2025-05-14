import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import generateJoiningId from "../../../lib/generateJoiningId";
import { auth } from "@repo/auth/checkAuth";
import { CreateRoomSchema } from "@repo/common/types";
import redis from "@repo/redis/index";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = CreateRoomSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Inputs",
        },
        { status: 400 }
      );
    }

    const { roomTitle } = parsedData.data;

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
    if (!userId) {
      return;
    }
    const response = await prisma.room.create({
      data: {
        roomTitle,
        joiningId: generateJoiningId(),
        createdBy: userId,
      },
    });

    // await redis.set(`joiningId:${response.joiningId}`, response.id);

    return NextResponse.json(
      {
        success: true,
        message: "Room created successfully",
        joiningId: response.joiningId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
