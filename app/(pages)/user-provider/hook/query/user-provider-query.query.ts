"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import axios from "axios";
import { ROUTES_USER_PROVIDER } from "../../config-route/route.config";
import { useMemo, useState } from "react";

// ? STATISTICS
export const useQueryStatistics = (publicId: string, currentPath: string) => {
  const { data: Statistics, isFetching: isFetchingStatistics } = useQuery({
    queryKey: ["keyStatistics", publicId],
    queryFn: async () => {
      const URL = ROUTES_USER_PROVIDER.GET({
        key: "statistics",
        currentPath: currentPath,
      });
      const { data } = await axios.get(URL);
      return data;
    },
    enabled: !!publicId && currentPath === "/user-provider",
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    placeholderData: keepPreviousData,
  });

  const StatisticsData = useMemo(() => Statistics ?? [], [Statistics]);

  return { StatisticsData, isFetchingStatistics };
};

// ? CAR FILTER
export const useQueryCarFilter = (publicId: string, currentPath: string) => {
  const [carFilter, setCarFilter] = useState({
    brand: "",
    model: "",
  });
  const limit = 10;

  //  * Brand
  const {
    data: CarFilterBrand,
    isFetching: isFCarFilterBrand,
    refetch: carFilterBrandRefetch,
    fetchNextPage: FNPCarFilterBrand,
    hasNextPage: HNPCarFilterBrand,
    isFetchingNextPage: IFNPCarFilterBrand,
    isError: isErrorCarFilterBrand,
    error: errorCarFilterBrand,
  } = useInfiniteQuery({
    queryKey: ["keyCarFilterBrand", publicId, carFilter.brand],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_USER_PROVIDER.GET({
        key: "carFilterBrand",
        currentPath: currentPath,
        brand: carFilter.brand,
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
    enabled:
      !!publicId && currentPath === "/user-provider" && !!carFilter.brand,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    throwOnError: (error: any) => {
      return error.status === 500;
    },
  });

  //  * Model
  const {
    data: CarFilterModel,
    isFetching: isFCarFilterModel,
    refetch: carFilterModelRefetch,
    fetchNextPage: FNPCarFilterModel,
    hasNextPage: HNPCarFilterModel,
    isFetchingNextPage: IFNPCarFilterModel,
    isError: isErrorCarFilterModel,
    error: errorCarFilterModel,
  } = useInfiniteQuery({
    queryKey: ["keyCarFilterModel", publicId, carFilter.model],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_USER_PROVIDER.GET({
        key: "carFilterModel",
        currentPath: currentPath,
        model: carFilter.model,
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
    enabled:
      !!publicId && currentPath === "/user-provider" && !!carFilter.model,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    throwOnError: (error: any) => {
      return error.status === 500;
    },
  });

  //  * Brand And Model
  const {
    data: CarFilterBrandAndModel,
    isFetching: isFCarFilterBrandAndModel,
    refetch: carFilterBrandAndModelRefetch,
    fetchNextPage: FNPCarFilterBrandAndModel,
    hasNextPage: HNPCarFilterBrandAndModel,
    isFetchingNextPage: IFNPCarFilterBrandAndModel,
    isError: isErrorCarFilterBrandAndModel,
    error: errorCarFilterBrandAndModel,
  } = useInfiniteQuery({
    queryKey: [
      "keyCarFilterBrandAndModel",
      publicId,
      carFilter.brand,
      carFilter.model,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_USER_PROVIDER.GET({
        key: "carFilterBrandAndModel",
        currentPath: currentPath,
        brand: carFilter.brand,
        model: carFilter.model,
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
    enabled:
      !!publicId &&
      currentPath === "/user-provider" &&
      !!carFilter.brand &&
      !!carFilter.model,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    throwOnError: (error: any) => {
      return error.status === 500;
    },
  });

  const CarFilterBrandData = useMemo(
    () => CarFilterBrand?.pages.flatMap((page) => page.data) ?? [],
    [CarFilterBrand?.pages],
  );

  const CarFilterModelData = useMemo(
    () => CarFilterModel?.pages.flatMap((page) => page.data) ?? [],
    [CarFilterModel?.pages],
  );

  const CarFilterBrandAndModelData = useMemo(
    () => CarFilterBrandAndModel?.pages.flatMap((page) => page.data) ?? [],
    [CarFilterBrandAndModel?.pages],
  );

  return {
    // * FILTER BRAND ====
    CarFilterBrandData,
    isFCarFilterBrand,
    carFilterBrandRefetch,
    FNPCarFilterBrand,
    HNPCarFilterBrand,
    IFNPCarFilterBrand,
    isErrorCarFilterBrand,
    errorCarFilterBrand,
    queryKeyCarFilterBrand: ["keyCarFilterBrand", publicId, carFilter.brand],

    // * FILTER MODEL ====
    CarFilterModelData,
    isFCarFilterModel,
    carFilterModelRefetch,
    FNPCarFilterModel,
    HNPCarFilterModel,
    IFNPCarFilterModel,
    isErrorCarFilterModel,
    errorCarFilterModel,
    queryKeyCarFilterModel: ["keyCarFilterModel", publicId, carFilter.model],

    // * FILTER BRAND AND MODEL ====
    CarFilterBrandAndModelData,
    isFCarFilterBrandAndModel,
    carFilterBrandAndModelRefetch,
    FNPCarFilterBrandAndModel,
    HNPCarFilterBrandAndModel,
    IFNPCarFilterBrandAndModel,
    isErrorCarFilterBrandAndModel,
    errorCarFilterBrandAndModel,
    queryKeyCarFilterBrandAndModel: [
      "keyCarFilterBrandAndModel",
      publicId,
      carFilter.brand,
      carFilter.model,
    ],

    carLimit: limit,
    carFilter,
    setCarFilter,
  };
};

// ? CAR LIST
export const useQueryCarList = (publicId: string, currentPath: string) => {
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
    queryKey: ["keyCarList", publicId],
    queryFn: async ({ pageParam = 1 }) => {
      const URL = ROUTES_USER_PROVIDER.GET({
        key: "car",
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
    enabled: !!publicId && currentPath === "/user-provider",
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false, // Tidak refetch saat kembali ke aplikasi
    refetchOnMount: false, // "always" => refetch jika stale saja
    retry: false,
    throwOnError: (error: any) => {
      return error.status === 500;
    },
  });

  const CarListData = useMemo(
    () => carListData?.pages.flatMap((page) => page.data) ?? [],
    [carListData?.pages],
  );

  return {
    CarListData,
    isFCarListData,
    carListRefetch,
    FNPCarList,
    HNPCarList,
    IFNPCarList,
    isErrorCar,
    errorCar,
    queryKeyTransactions: ["keyCarList", publicId],
    carLimit: limit,
  };
};
