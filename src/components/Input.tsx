"use client";
import React, { useState } from "react";
import { useCreatePhoto } from "../hooks";
import { useToast } from "@/hooks/use-toast";
import { Input as ShadInput } from "./ui/input";
import { Button } from "./ui/button";
import { GenarativeImages, ShadowImages } from "@/components";
const Input: React.FC = () => {
  const [inputtext, setinputtext] = useState<string>("");
  const [islodaing, createpost, errormessage, photourl] = useCreatePhoto();
  const [upload, setupload] = useState<boolean>(false);
  const { toast } = useToast();

  const GenRatePhoto = async () => {
    try {
      let result = await createpost({ inputtext });
      if (result) {
        toast({
          title: "Successfully Uploaded",
        });
        setupload(true);
      } else {
        toast({
          title: errormessage,
        });
        setupload(false);
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
      });
    }
  };

  return (
    <div className="h-dvh grid place-content-center bg-gradient-to-r from-gray-100 via-blue-200 to-indigo-500 p-6 rounded-lg shadow-lg">
      <div className="space-y-4">
        <label htmlFor="text" className="text-sm font-medium text-gray-700">
          Enter Text to Generate Photo
        </label>
        <ShadInput
          type="text"
          onChange={(e) => setinputtext(e.target.value)}
          placeholder="Type something..."
          className="w-full sm:w-[600px] lg:w-[800px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <Button
          onClick={GenRatePhoto}
          className="w-full sm:w-[600px] lg:w-[800px] bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-300"
        >
          {islodaing ? "Loading..." : "Create Photo"}
        </Button>
      </div>

      {!islodaing && upload && <GenarativeImages photourl={photourl} />}

      {islodaing && <ShadowImages />}
    </div>
  );
};

export default Input;
