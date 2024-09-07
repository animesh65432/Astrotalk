import { useState } from "react";
import axios from "axios";

type createpostpayload = {
  inputtext: string;
};
type useCreatePostreturntypes = [
  islodaing: boolean,
  createpost: (data: createpostpayload) => Promise<boolean>,
  errormessage: string,
  photourl: string
];
const useCreatePost = (): useCreatePostreturntypes => {
  const [islodaing, setloading] = useState<boolean>(false);
  const [errormessage, seterrormessage] = useState<string>("");
  const [photourl, setphotourl] = useState<string>("");

  const createpost = async (data: createpostpayload): Promise<boolean> => {
    setloading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/images/create",
        data
      );

      const url = response?.data?.imageUrl;
      setphotourl(url);
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

  return [islodaing, createpost, errormessage, photourl];
};

export default useCreatePost;
