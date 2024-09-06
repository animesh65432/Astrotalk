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
      let response = await axios.post(
        "http://localhost:3000/api/images/create",
        data
      );

      let url = response?.data?.data?.data?.url;
      setphotourl(url);
      return true;
    } catch (error: any) {
      console.log(error);
      seterrormessage(error.response.data.message);
      return false;
    } finally {
      setloading(false);
    }
  };

  return [islodaing, createpost, errormessage, photourl];
};

export default useCreatePost;
