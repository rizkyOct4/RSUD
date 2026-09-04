"use client";

import { ReactNode } from "react";
import { UserCarRentalContext } from "@/app/context/context";
import { useSessionClient } from "@/_util/c-session";
import { useUserCarRentalHookIndex } from "../hook/index-user-rental.hook";
import { usePathname } from "next/navigation";

interface UserCarRentalProps {
  children: ReactNode;
}

const UserCarRental: React.FC<UserCarRentalProps> = ({ children }) => {
  const { publicId } = useSessionClient();

      const currentPath = usePathname();
  //   //   //   const currentPath = pathname.split("/")[2];
    const index = useUserCarRentalHookIndex(publicId, currentPath);

    const values = {
      ...index,
    };

  return (
    <UserCarRentalContext.Provider value={values}>
      {children}
    </UserCarRentalContext.Provider>
  );
};

export default UserCarRental;
