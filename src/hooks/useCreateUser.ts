import { useState } from "react";
import axios from "axios";
import { SingupTypes } from "../types";

type useCreateUserrteturntypes = [
  loading: boolean,
  CreateUser: (data: SingupTypes) => Promise<boolean>,
  errormessage: string
];
const useCreateUser = (): useCreateUserrteturntypes => {
  const [loading, setloading] = useState<boolean>(false);
  const [errormessage, seterrormessage] = useState<string>("");
  const CreateUser = async (data: SingupTypes): Promise<boolean> => {
    setloading(true);
    try {
      await axios.post(
        `https://astrotalk-ten.vercel.app/api/users/create`,
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

  return [loading, CreateUser, errormessage];
};

export default useCreateUser;
