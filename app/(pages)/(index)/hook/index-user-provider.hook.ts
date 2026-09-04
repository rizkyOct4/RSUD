"use client";

import { useQueryDashboardCarList } from "./query/dashboard-query.query";
import { useMutationPostRentCar } from "./mutation/POST-dashboard.mutation";

export const useDashboardHookIndex = (
  publicId: string,
  // currentPath: string,
) => {
  const QGetDashboardCarList = useQueryDashboardCarList(publicId);
  // const QGetFilter = useQueryCarFilter(publicId, currentPath);
  // const QGetCarList = useQueryCarList(publicId, currentPath);

  const MPostRentCar = useMutationPostRentCar({
    queryKeyRentCar: QGetDashboardCarList.queryKeyDashboardRentCar,
  });

  return {
    ...QGetDashboardCarList,
    // ...QGetFilter,
    // ...QGetCarList,
    ...MPostRentCar,
  };
};
