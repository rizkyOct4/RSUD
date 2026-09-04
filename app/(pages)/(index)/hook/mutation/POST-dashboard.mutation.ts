"use client";

import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import { QueryKey } from "@tanstack/react-query";
import { ROUTES_DASHBOARD } from "../../config-route/route.config";
// import { ROUTES_USER_PROVIDER } from "../../config-route/route.config";

type TUseMutationPostRentCar = {
  queryKeyRentCar: QueryKey;
};

export const useMutationPostRentCar = ({
  queryKeyRentCar,
}: TUseMutationPostRentCar) => {
  const queryClient = useQueryClient();

  const { mutateAsync: postRentCar, isPending: isPendingPostRentCar } =
    useMutation({
      mutationFn: async (data) => {
        const URL = ROUTES_DASHBOARD.POST({
          key: "postRentCar",
        });
        const res = await axios.post(URL, data);
        return res.data;
      },
      onMutate: async (mutate: any) => {
        await Promise.all([
          queryClient.cancelQueries({ queryKey: queryKeyRentCar }),
        ]);

        const prevRentCar = queryClient.getQueryData(queryKeyRentCar);

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

        return { prevRentCar };
      },
      onError: (error, _variables, context) => {
        console.error(error);
        if (context?.prevRentCar) {
          queryClient.setQueryData(
            queryKeyRentCar,
            context.prevRentCar,
          );
        }
      },
    });

  return { postRentCar, isPendingPostRentCar };
};
