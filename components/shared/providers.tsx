"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import HolyLoader from "holy-loader";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
      <Toaster />
      <HolyLoader color="#1CBA93" />
    </>
  );
};
