"use client";

import { useQueryAuth } from "./query/auth.query";

export const useAuthHookIndex = (publicId: string) => {
  const QGet = useQueryAuth({ publicId });

  return {
    ...QGet,
  };
};
