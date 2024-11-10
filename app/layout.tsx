import "./globals.css";
import Script from "next/script";
import { Providers } from "@/components/shared/providers";
import { inter } from "@/components/ui/fonts";
import React from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/dracula.css"></link>

        <Script
          src="https://kit.fontawesome.com/ccf76912e7.js"
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
