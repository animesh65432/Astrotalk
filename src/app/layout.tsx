"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/components/NextAuthProvider";
import ContextProvider from "@/components/ContextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ContextProvider>{children}</ContextProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
