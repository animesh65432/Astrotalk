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
      await axios.post(`${process.env.BACKENDURL}/api/users/login`, data);
      return true;
    } catch (error: any) {
      seterrormessage(error.response.data.message);
      return false;
    } finally {
      setloading(false);
    }
  };

  return [loading, logintheuser, errormessage];
};

export default useLoginUser;
