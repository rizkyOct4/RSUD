"use client";

import { useSession } from "next-auth/react";

export const useSessionClient = () => {
  const { data: session } = useSession();

  const publicId = session?.user?.publicId as string;
  const name = session?.user?.name as string;
  const userModel = session?.user?.userModel as string;

  return { publicId, name, userModel };
};
