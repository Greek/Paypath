"use client";

import { getAPI } from "@/lib/fetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface QueryContextProps {
  children: React.ReactNode;
}

export function QueryContext({ children }: QueryContextProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: getAPI,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
