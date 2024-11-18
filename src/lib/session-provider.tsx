"use client";
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({});

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Toaster position="top-right" />
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
