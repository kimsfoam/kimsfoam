import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { fontClass } from "@/lib/font";
import { Header } from "@/ui/layout/header";
import { AuthProvider } from "@/app/authProvider";

export const metadata: Metadata = {
  title: "킴스폼",
  description: "우레탄폼 전문 단열 시공업체입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontClass} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          {/*<Popup />*/}
          {/*<LoginContainer />*/}
          <Header />
          {children}
          {/*<Footer />*/}
        </AuthProvider>
      </body>
    </html>
  );
}
