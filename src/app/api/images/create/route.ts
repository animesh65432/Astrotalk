import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export const POST = async (request: NextRequest) => {
  try {
    const { inputtext } = await request.json();
    console.log(inputtext);

    if (!inputtext) {
      return NextResponse.json(
        {
          data: {
            message: "please type something",
          },
        },
        { status: 400 }
      );
    }

    const response = await axios.post(
      "https://ai-text-to-image-generator-api.p.rapidapi.com/realistic",
      {
        inputs: inputtext,
      },
      {
        headers: {
          "x-rapidapi-key":
            "b40c346f60msh421fe6afa0cf5f5p147d9djsn287645bbc55d",
          "x-rapidapi-host": "ai-text-to-image-generator-api.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);

    return NextResponse.json(
      {
        data: {
          message: "Sucessfully create it",
          data: response?.data,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
