import axios from "axios";
import { LoginTypes } from "../types";
import { useState } from "react";

type uselLoginUserreturntypes = [
  loading: boolean,
  logintheuser: (data: LoginTypes) => Promise<boolean>,
  errormessage: string
];

const useLoginUser = (): uselLoginUserreturntypes => {
  const [loading, setloading] = useState<boolean>(false);
  const [errormessage, seterrormessage] = useState<string>("");

  const logintheuser = async (data: LoginTypes): Promise<boolean> => {
    setloading(true);
    try {
      await axios.post(
        `https://astrotalk-ten.vercel.app/api/users/login`,
        data
      );
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        seterrormessage(
          error.response?.data.message || "An unknown error occurred."
        );
      } else {
        seterrormessage("An unexpected error occurred.");
      }
      return false;
    } finally {
      setloading(false);
    }
  };

  return [loading, logintheuser, errormessage];
};

export default useLoginUser;
