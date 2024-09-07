import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { inputtext } = await request.json();
    console.log("Input text:", inputtext);

    if (!inputtext) {
      return NextResponse.json(
        { error: "Please type something" },
        { status: 400 }
      );
    }

    const response = await fetch(process.env.IMAGES_MODEL as string, {
      headers: {
        Authorization: `Bearer hf_${process.env.IMAGES_MODEL_SECRECT}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ inputs: inputtext }),
    });
    if (!response.ok) {
      throw new Error(`API response error: ${response.statusText}`);
    }

    const result = await response.arrayBuffer();
    const base64Image = `data:image/jpeg;base64,${Buffer.from(result).toString(
      "base64"
    )}`;

    return NextResponse.json(
      {
        message: "Successfully created",
        imageUrl: base64Image,
      },
      { status: 201 }
    );
  } catch (error) {
    let errorMessage = "An error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error instanceof Response) {
      const errorText = await error.text();
      errorMessage = `API error: ${errorText}`;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
