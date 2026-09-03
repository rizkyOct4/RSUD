"use client"


import {
  useQueryClient,
  useMutation,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import { QueryKey } from "@tanstack/react-query";
import { ROUTES_USER_PROVIDER } from "../../config-route/route.config";



export const useMutationPostCar = (currentPath: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: postCar,
    isPending: isPendingPostCar,
  } = useMutation({
    mutationFn: async (data) => {
      const URL = ROUTES_USER_PROVIDER.POST({
        key: "postCar",
        currentPath: currentPath,
      });
      const res = await axios.post(URL, data);
      return res.data;
    },
    // onMutate: async (mutate: {
    //   id: string;
    //   refId: string;
    //   nominal: number;
    //   information: string;
    // }) => {
    //   await Promise.all([
    //     queryClient.cancelQueries({ queryKey: queryKeyTransactions }),
    //   ]);

    //   const prevTransactions = queryClient.getQueryData(queryKeyTransactions);

    //   queryClient.setQueryData<InfiniteData<TransactionsDataType[]>>(
    //     queryKeyTransactions,
    //     (oldData) => {
    //       if (!oldData) return oldData;

    //       return {
    //         ...oldData,
    //         pages: oldData?.pages.map((page: any) => ({
    //           ...page,
    //           data: page?.data.filter(
    //             (f: { id: string }) => f.id !== mutate.id,
    //           ),
    //         })),
    //       };
    //     },
    //   );

    //   return { prevTransactions };
    // },
    // onError: (error, _variables, context) => {
    //   console.error(error);
    //   if (context?.prevTransactions) {
    //     queryClient.setQueryData(
    //       queryKeyTransactions,
    //       context.prevTransactions,
    //     );
    //   }
    // },
  });

  return { postCar, isPendingPostCar };
};






