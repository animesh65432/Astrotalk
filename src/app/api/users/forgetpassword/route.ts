import { NextRequest, NextResponse } from "next/server";
import { User, ForGetPassWord } from "@/Models";
import nodemailer from "nodemailer";
import dbconnect from "@/lib/dbConnect";

export const POST = async (request: NextRequest) => {
  await dbconnect();
  try {
    const { email } = await request.json();

    const CheckTheExsitinUser = await User.find({ email });

    if (CheckTheExsitinUser.length === 0) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const newforgetpassword = await ForGetPassWord.create({
      active: true,
      user: CheckTheExsitinUser[0]._id,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILERUSER as string,
        pass: process.env.NODEMAILERPASSWORD as string,
      },
    });

    transporter.sendMail({
      from: process.env.NODEMAILERUSER as string,
      to: email,
      subject: "Password Reset Request",
      html: `<a href='https://astrotalk-ten.vercel.app
/UpdatePassword/${newforgetpassword._id}'>Click here to reset your password</a>`,
    });

    return NextResponse.json(
      {
        message: {
          sucess: true,
          message: "password reset linl sent to your email",
        },
      },
      {
        status: 200,
      }
    );
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
        message: {
          sucess: false,
          message: errorMessage,
        },
      },
      { status: 500 }
    );
  }
};
