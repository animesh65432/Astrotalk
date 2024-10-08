import { NextRequest, NextResponse } from "next/server";
import { User, ForGetPassWord } from "@/Models";
import bycrpt from "bcrypt";
import dbconnect from "@/lib/dbConnect";

export const PUT = async (request: NextRequest) => {
  await dbconnect();
  try {
    const { id, password } = await request.json();

    const findforgetpassword = await ForGetPassWord.findById(id);

    if (!findforgetpassword || !findforgetpassword.active) {
      return NextResponse.json(
        {
          message: {
            sucess: false,
            message: "link expiredor link is not vaild",
          },
        },
        { status: 400 }
      );
    }
    const hashpassword = await bycrpt.hash(password, 10);
    const user = await User.findById(findforgetpassword.user);

    await user.updateOne({ password: hashpassword });

    await findforgetpassword.updateOne({ active: false });

    return NextResponse.json({
      message: {
        sucess: true,
        message: "password updated sucessfully",
      },
    });
  } catch (error) {
    let errorMessage = "An error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error instanceof Response) {
      const errorText = await error.text();
      errorMessage = `API error: ${errorText}`;
    }
    return NextResponse.json({
      message: {
        sucess: false,
        message: errorMessage,
      },
    });
  }
};
