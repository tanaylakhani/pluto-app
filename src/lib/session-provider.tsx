"use client";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({});

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        {children}
      </QueryClientProvider>
  );
};

export default AppProvider;
