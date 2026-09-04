"use client";
import {
  useQueryStatistics,
  useQueryCarFilter,
  useQueryCarList,
} from "./query/user-provider-query.query";
import { useMutationPostCar } from "./mutation/POST.mutation";

export const useUserCarProviderHookIndex = (
  publicId: string,
  currentPath: string,
) => {
  const QGetStatistics = useQueryStatistics(publicId, currentPath);
  const QGetFilter = useQueryCarFilter(publicId, currentPath);
  const QGetCarList = useQueryCarList(publicId, currentPath);

  const MPostCar = useMutationPostCar({
    currentPath: currentPath,
    queryKeyStatics: QGetStatistics.queryKeyCarListStatisc,
    queryKeyCarList: QGetCarList.queryKeyCarList,
  });

  return {
    ...QGetStatistics,
    ...QGetFilter,
    ...QGetCarList,
    ...MPostCar,
  };
};
