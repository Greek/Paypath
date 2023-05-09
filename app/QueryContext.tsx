"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface QueryContextProps {
  children: React.ReactNode;
}

export function QueryContext({ children }: QueryContextProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
