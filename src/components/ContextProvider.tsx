import React, { ReactNode, useState } from "react";
import Context from "@/Context";

type Props = {
  children: ReactNode;
};
const ContextProvider: React.FC<Props> = ({ children }) => {
  const [color, setcolor] = useState<boolean>(false);

  const ontoggole = () => {
    setcolor((prev) => !prev);
  };
  return (
    <Context.Provider value={{ color, ontoggole }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
