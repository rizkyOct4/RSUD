import ModalDashboard from "./components/modal";
import type { Metadata } from "next";
import { GETDashboardCarList } from "@/_lib/services/(index)/GET-dashboard.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/app/get-query-client";
import GetSession from "@/_util/session";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Halaman dashboard users.",
};

const Page = async () => {
  const queryClient = getQueryClient();
  const session = await GetSession();
  const publicId = session?.publicId;

  let key;

  if (publicId) {
    key = ["keyDashboardCarList", publicId];
  } else {
    key = ["keyDashboardCarList"];
  }

  await queryClient.infiniteQuery({
    queryKey: key,
    queryFn: ({ pageParam = 1 }) =>
      GETDashboardCarList({
        offset: (pageParam - 1) * 10,
        limit: 10,
      }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <ModalDashboard />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;

// import TransactionModalClient from "./transcation-modal-client";
// import type { Metadata } from "next";
// // import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// // import { getQueryClient } from "@/app/get-query-client";
// // import GetSession from "@/_lib/session";
// // import { GetTransactionList } from "@/_lib/services/transaction/services-transaction-index";
// // import { Suspense } from "react";

// export const metadata: Metadata = {
//   title: "Transaksi",
//   description: "Halaman transaksi user.",
// };

// const TransactionPage = () => {
//   return <TransactionModalClient />;
// };
// // interface ITransactionPage {
// //   searchParams: Promise<{ s?: string; v?: string }>;
// // }

// // const getToday = () => {
// //   const today = new Date();
// //   return today.toISOString().split("T")[0];
// // };

// // const TransactionPage = async ({ searchParams }: ITransactionPage) => {
// //   const { v } = await searchParams;
// //   const queryClient = getQueryClient();
// //   const { publicId } = await GetSession();
// //   const date = getToday();

// //   const key = ["keyTransactionsList", publicId, v, date];
// //   await queryClient.prefetchInfiniteQuery({
// //     queryKey: key,
// //     queryFn: ({ pageParam = 1 }) =>
// //       GetTransactionList({
// //         publicId: publicId,
// //         transactionName: v,
// //         convDate: date,
// //         offset: (pageParam - 1) * 10,
// //         limit: 15,
// //       }),
// //     initialPageParam: 1,
// //   });

// //   return (
// //     <HydrationBoundary state={dehydrate(queryClient)}>
// //       <Suspense fallback={null}>
// //         <TransactionModalClient />
// //       </Suspense>
// //     </HydrationBoundary>
// //   );
// // };

// export default TransactionPage;
