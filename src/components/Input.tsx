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
    <div className="w-full p-6 bg-white rounded-lg shadow-lg space-y-4">
      <label
        htmlFor="text"
        className="text-sm font-medium text-gray-700 block text-center"
      >
        Enter Text to Generate Photo
      </label>
      <ShadInput
        type="text"
        value={inputtext}
        onChange={(e) => setinputtext(e.target.value)}
        placeholder="Type something..."
        className="w-full sm:max-w-md lg:max-w-lg mx-auto border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <Button
        onClick={GenRatePhoto}
        className="w-full sm:max-w-md lg:max-w-lg mx-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors duration-300 ml-28"
      >
        {islodaing ? "Loading..." : "Create Photo"}
      </Button>

      {!islodaing && upload && <GenarativeImages photourl={photourl} />}

      {islodaing && <ShadowImages />}
    </div>
  );
};

export default Input;
