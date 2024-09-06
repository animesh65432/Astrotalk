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
      await axios.put("http://localhost:3000/api/users/updatepassword", data);
      return true;
    } catch (error: any) {
      seterrormessage(
        error?.response?.data?.message?.message || "Internal server errors"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return [isLoading, errormessage, UpdatePassword];
};

export default useUpdatePassword;
