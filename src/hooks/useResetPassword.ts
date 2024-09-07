import axios from "axios";
import { useState } from "react";
import { ResetPasswordTypes } from "../types";
type useResetPassWordreturntypes = [
  isLoading: boolean,
  errormessage: string,
  ResetPassword: (data: ResetPasswordTypes) => Promise<boolean>
];

const useResetPassWord = (): useResetPassWordreturntypes => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errormessage, seterrormessage] = useState<string>("");

  const ResetPassword = async (data: ResetPasswordTypes): Promise<boolean> => {
    setLoading(true);
    try {
      await axios.post(
        `https://astrotalk-ten.vercel.app/api/users/forgetpassword`,
        data
      );
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        seterrormessage(
          error?.response?.data?.message?.message ||
            "An unknown error occurred."
        );
      } else {
        seterrormessage("An unexpected error occurred.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return [isLoading, errormessage, ResetPassword];
};

export default useResetPassWord;
