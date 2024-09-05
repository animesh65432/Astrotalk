import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type props = {
  children: ReactNode;
};
const NextAuthProvider: React.FC<props> = ({ children }) => {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
};

export default NextAuthProvider;
