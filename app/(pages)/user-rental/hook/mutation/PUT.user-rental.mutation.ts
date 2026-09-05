"use client";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import { QueryKey } from "@tanstack/react-query";
import { ROUTES_USER_RENTAL } from "../../config-route/route.config";

export const useMutationPutReturnCar = ({
  currentPath,
  queryKeyCarRental,
}: {
  currentPath: string;
  queryKeyCarRental: QueryKey;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: putReturnCar, isPending: isPendingPutReturnCar } =
    useMutation({
      mutationFn: async (data) => {
        const URL = ROUTES_USER_RENTAL.PUT({
          key: "putReturnCarRental",
          currentPath: currentPath,
        });
        const res = await axios.put(URL, data);
        return res.data;
      },
      onMutate: async (mutate: any) => {
        await Promise.all([
          queryClient.cancelQueries({ queryKey: queryKeyCarRental }),
        ]);

        const prevReturnCar = queryClient.getQueryData(queryKeyCarRental);

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

        return { prevReturnCar };
      },
      onSuccess: (data, variables, context) => {
        queryClient.invalidateQueries({
          queryKey: queryKeyCarRental,
        });
      },
      onError: (error, _variables, context) => {
        console.error(error);
        if (context?.prevReturnCar) {
          queryClient.setQueryData(queryKeyCarRental, context.prevReturnCar);
        }
      },
    });

  return { putReturnCar, isPendingPutReturnCar };
};
