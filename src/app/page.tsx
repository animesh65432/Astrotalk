"use client";

import { useEffect } from "react";
import dbconnect from "@/lib/dbConnect";

export default function Home() {
  const checkdatabaseconnection = async () => {
    try {
      await dbconnect();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkdatabaseconnection();
  }, []);
  return <></>;
}
