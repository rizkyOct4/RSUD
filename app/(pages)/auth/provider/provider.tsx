"use client";

import { ReactNode } from "react";
import { AuthContext } from "@/app/context/context";
import { useSessionClient } from "@/_util/c-session";
import { usePathname } from "next/navigation";
import { useAuthHookIndex } from "../hook/index-auth.hook";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { publicId } = useSessionClient();

  //   const currentPath = usePathname();
  //   //   const currentPath = pathname.split("/")[2];
  const index = useAuthHookIndex(publicId);

  const values = {
    ...index,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
