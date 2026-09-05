"use client";

import { useQueryCarRentalList } from "./query/user-rental.query";
import { useMutationPutReturnCar } from "./mutation/PUT.user-rental.mutation";

export const useUserCarRentalHookIndex = (
  publicId: string,
  currentPath: string,
) => {
  const QGetCarRental = useQueryCarRentalList(publicId, currentPath);
  const MPutReturnCar = useMutationPutReturnCar({
    currentPath,
    queryKeyCarRental: QGetCarRental.queryKeyCarRental,
  });

  return {
    ...QGetCarRental,
    // ...QGetFilter,
    // ...QGetCarList,
    ...MPutReturnCar,
  };
};
