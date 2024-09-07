"use client";
import React, { useContext } from "react";
import { Input, Navbar } from "./index";
import Context from "@/Context";

const Home: React.FC = () => {
  const { color } = useContext(Context);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start ${
        color ? "bg-slate-950 text-white" : "bg-white text-black"
      } transition-colors duration-300`}
    >
      <Navbar />
      <div className="mt-10 w-full max-w-3xl">
        <Input />
      </div>
    </div>
  );
};

export default Home;
