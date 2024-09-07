import axios from "axios";
import { useState } from "react";
type UpdatePasswordPayload = {
  id: string;
  password: string;
};

type useUpdatePasswordreturntypes = [
  isLoading: boolean,
  errormessage: string,
  UpdatePassword: (data: UpdatePasswordPayload) => Promise<boolean>
];

const useUpdatePassword = (): useUpdatePasswordreturntypes => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errormessage, seterrormessage] = useState<string>("");

  const UpdatePassword = async (
    data: UpdatePasswordPayload
  ): Promise<boolean> => {
    setLoading(true);
    try {
      await axios.put(
        "https://astrotalk-ten.vercel.app/api/users/updatepassword",
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

  return [isLoading, errormessage, UpdatePassword];
};

export default useUpdatePassword;
