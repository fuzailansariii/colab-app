import { NextResponse, NextRequest } from "next/server";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { SignupSchema } from "@repo/common/types";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const parsedBody = SignupSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid inputs",
        },
        { status: 400 }
      );
    }

    const { fullName, email, password } = parsedBody.data;

    // check if email already exist
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exist with this email",
        },
        {
          status: 409,
        }
      );
    }

    // if no user found then hash the password and create new user

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        newUser: { userId: newUser.id, fullName: newUser.fullName },
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
