import React from "react";
import { UpdatePasword } from "../../../../components";

type Props = {
  params: {
    id: string;
  };
};
const UpdatePaswordPage: React.FC<Props> = ({ params }) => {
  console.log(params);
  return (
    <>
      <UpdatePasword id={params.id} />
    </>
  );
};

export default UpdatePaswordPage;
