"use client";

import { useQueryCarRentalList } from "./query/user-rental.query";

// import {
//   useQueryStatistics,
//   useQueryCarFilter,
//   useQueryCarList,
// } from "./query/user-provider-query.query";
// import { useMutationPostCar } from "./mutation/POST.mutation";

export const useUserCarRentalHookIndex = (
  publicId: string,
  currentPath: string,
) => {
  const QGetCarRental = useQueryCarRentalList(publicId, currentPath);
  //   const QGetFilter = useQueryCarFilter(publicId, currentPath);
  //   const QGetCarList = useQueryCarList(publicId, currentPath);

  //   const MPostCar = useMutationPostCar(currentPath);

  return {
    ...QGetCarRental,
    // ...QGetFilter,
    // ...QGetCarList,
    // ...MPostCar,
  };
};
