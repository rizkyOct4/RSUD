"use client";

import { ReactNode } from "react";
import { DashboardContext } from "@/app/context/context";
import { useSessionClient } from "@/_util/c-session";
import { useDashboardHookIndex } from "../hook/index-user-provider.hook";
// import { usePathname } from "next/navigation";

interface DashboardProviderProps {
  children: ReactNode;
}

const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const { publicId } = useSessionClient();

//   const currentPath = usePathname();
  //   //   //   const currentPath = pathname.split("/")[2];
  const index = useDashboardHookIndex(publicId);

  const values = {
    ...index,
  };

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
