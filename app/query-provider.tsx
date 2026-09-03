"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { getQueryClient } from "./get-query-client";
import { SuspenseLoading } from "./suspense-loading";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SuspenseLoading>
          {children}
        </SuspenseLoading>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default QueryProvider;
