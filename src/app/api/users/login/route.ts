import { NextRequest, NextResponse } from "next/server";
import { User } from "@/Models";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dbconnect from "@/lib/dbConnect";
export const POST = async (request: NextRequest) => {
  await dbconnect();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          sucess: false,
          message: "invalid credentials",
        },
        { status: 400 }
      );
    }

    let CheckExsitingUser = await User.findOne({ email });

    if (!CheckExsitingUser) {
      return NextResponse.json(
        {
          sucess: false,
          message: "user not found",
        },
        { status: 404 }
      );
    }

    let checkpassword = await bcrypt.compare(
      password,
      CheckExsitingUser.password
    );

    if (!checkpassword) {
      return NextResponse.json(
        {
          sucess: false,
          message: "Password is Wrong",
        },
        { status: 400 }
      );
    }

    let response = NextResponse.json(
      {
        sucess: true,
        message: "user login sucessfully",
      },
      { status: 200 }
    );

    let token = jsonwebtoken.sign(
      {
        id: CheckExsitingUser._id,
        email: CheckExsitingUser.email,
        name: CheckExsitingUser.name,
      },
      process.env.JSONWEBTOKEN as string,
      { expiresIn: "15d" }
    );

    response.cookies.set("token", token, { maxAge: 60 * 60 * 24 * 15 });

    return response;
  } catch (error) {
    let errorMessage = "An error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error instanceof Response) {
      const errorText = await error.text();
      errorMessage = `API error: ${errorText}`;
    }
    return NextResponse.json(
      {
        sucess: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
};
