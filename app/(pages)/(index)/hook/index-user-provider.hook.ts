"use client";

import { useQueryDashboardCarList, useQueryDashboardSearchCarList } from "./query/dashboard-query.query";
import { useMutationPostRentCar } from "./mutation/POST-dashboard.mutation";

export const useDashboardHookIndex = (
  publicId: string,
  // currentPath: string,
) => {
  const QGetDashboardCarList = useQueryDashboardCarList(publicId);
  const QGetDashboardSearchCarList = useQueryDashboardSearchCarList(publicId);

  const MPostRentCar = useMutationPostRentCar({
    queryKeyRentCar: QGetDashboardCarList.queryKeyDashboardRentCar,
    queryKeySearchRentCar: QGetDashboardSearchCarList.queryKeyDashboardSearchRentCar,
  });

  return {
    ...QGetDashboardCarList,
    ...QGetDashboardSearchCarList,
    // ...QGetFilter,
    // ...QGetCarList,
    ...MPostRentCar,
  };
};
