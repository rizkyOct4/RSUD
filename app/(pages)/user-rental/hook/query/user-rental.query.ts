"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
// import { ROUTES_USER_PROVIDER } from "../../config-route/route.config";
import { ROUTES_USER_RENTAL } from "../../config-route/route.config";
import { useMemo, useState } from "react";

export const useQueryCarRentalList = (publicId: string, currentPath: string) => {
  const limit = 10;
  const {
    data: carRentListData,
    isFetching: isFCarRentListData,
    refetch: carListRefetch,
    fetchNextPage: FNPCarList,
    hasNextPage: HNPCarList,
    isFetchingNextPage: IFNPCarList,
    isError: isErrorCar,
    error: errorCar,
  } = useInfiniteQuery({
    queryKey: ["keyCarRentalList", publicId],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_USER_RENTAL.GET({
        key: "carRental",
        currentPath: currentPath,
        pageParam: pageParam,
        limit: limit,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    initialPageParam: 1,
    enabled: !!publicId && currentPath === "/user-rental",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    throwOnError: (error: any) => {
      return error.status === 500;
    },
  });

  const CarRentListData = useMemo(
    () => carRentListData?.pages.flatMap((page) => page.data) ?? [],
    [carRentListData?.pages],
  );

  return {
    CarRentListData,
    isFCarRentListData,
    carListRefetch,
    FNPCarList,
    HNPCarList,
    IFNPCarList,
    isErrorCar,
    errorCar,
    queryKeyCarRental: ["keyCarRentalList", publicId],
    carLimit: limit,
  };
};
