"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
// import { ROUTES_USER_PROVIDER } from "../../config-route/route.config";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ROUTES_DASHBOARD } from "../../config-route/route.config";

export const useQueryDashboardCarList = (publicId: string) => {
  const currentPath = usePathname();

  let queryKey

  if(publicId) {
    queryKey =  ["keyDashboardCarList", publicId]
  } else {
    queryKey =  ["keyDashboardCarList"]

  }
  
  const limit = 10;
  const {
    data: carListData,
    isFetching: isFCarListData,
    refetch: carListRefetch,
    fetchNextPage: FNPCarList,
    hasNextPage: HNPCarList,
    isFetchingNextPage: IFNPCarList,
    isError: isErrorCar,
    error: errorCar,
  } = useInfiniteQuery({
    queryKey: ["keyDashboardCarList"],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_DASHBOARD.GET({
        key: "dashboardCar",
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
    enabled: currentPath === "/",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    throwOnError: (error: any) => {
      return error.status === 500;
    },
  });

  const DashboardCarListData = useMemo(
    () => carListData?.pages.flatMap((page) => page.data) ?? [],
    [carListData?.pages],
  );

  return {
    DashboardCarListData,
    isFCarListData,
    carListRefetch,
    FNPCarList,
    HNPCarList,
    IFNPCarList,
    isErrorCar,
    errorCar,
    queryKeyDashboardRentCar: queryKey,
    carLimit: limit,
  };
};
