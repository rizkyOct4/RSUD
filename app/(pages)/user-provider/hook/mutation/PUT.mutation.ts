"use client";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import { QueryKey } from "@tanstack/react-query";
import { ROUTES_USER_PROVIDER } from "../../config-route/route.config";

export const useMutationConfirmReturnCar = ({
  currentPath,
  queryKeyStatics,
  queryKeyCarList,
}: any) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: putConfirmCarReturn,
    isPending: isPendingPutConfirmCarReturn,
  } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_USER_PROVIDER.PUT({
        key: "confirmCarReturn",
        currentPath: currentPath,
      });
      const res = await axios.put(URL, data);
      return res.data;
    },
    onMutate: async (mutate: any) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeyStatics }),
        queryClient.cancelQueries({ queryKey: queryKeyCarList }),
      ]);

      const prevStatistics = queryClient.getQueryData(queryKeyStatics);
      const prevCarList = queryClient.getQueryData(queryKeyCarList);

      // queryClient.setQueryData<InfiniteData<TransactionsDataType[]>>(
      //   queryKeyTransactions,
      //   (oldData) => {
      //     if (!oldData) return oldData;

      //     return {
      //       ...oldData,
      //       pages: oldData?.pages.map((page: any) => ({
      //         ...page,
      //         data: page?.data.filter(
      //           (f: { id: string }) => f.id !== mutate.id,
      //         ),
      //       })),
      //     };
      //   },
      // );

      return { prevStatistics, prevCarList };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeyStatics,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeyCarList,
      });
    },
    onError: (error, _variables, context) => {
      console.error(error);
      if (context?.prevStatistics || context?.prevCarList) {
        queryClient.setQueryData(queryKeyStatics, context.prevStatistics);
        queryClient.setQueryData(queryKeyCarList, context.prevCarList);
      }
    },
  });

  return { putConfirmCarReturn, isPendingPutConfirmCarReturn };
};
