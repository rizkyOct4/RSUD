"use client";

import { ReactNode } from "react";
import { UserCarProviderContext } from "@/app/context/context";
import { useSessionClient } from "@/_util/c-session";
import { useUserCarProviderHookIndex } from "../hook/index-user-provider.hook";
import { usePathname } from "next/navigation";

interface UserCarProviderProps {
  children: ReactNode;
}

const UserCarProvider: React.FC<UserCarProviderProps> = ({ children }) => {
  const { publicId } = useSessionClient();

    const currentPath = usePathname();
  //   //   const currentPath = pathname.split("/")[2];
  const index = useUserCarProviderHookIndex(publicId, currentPath);

  const values = {
    ...index,
  };

  return <UserCarProviderContext.Provider value={values}>{children}</UserCarProviderContext.Provider>;
};

export default UserCarProvider;
