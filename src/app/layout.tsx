import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { fontClass } from "@/lib/font";
import { Header } from "@/ui/layout/header";
import { AuthProvider } from "@/app/authProvider";
import { Footer } from "@/ui/layout/footer";
import { MobileHeader } from "@/ui/layout/mobile-header";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

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
      <head>
        <meta
          name="naver-site-verification"
          content="a019c0fc73f3c06d222df84fe0ef9eb5b78a7f6a"
        />
      </head>
      <body className="font-sans">
        <AuthProvider>
          {/*<Popup />*/}
          {/*<LoginContainer />*/}
          <Header />
          {children}
          <Footer />
          <MobileHeader />
        </AuthProvider>
        <Script
          src="//log1.toup.net/mirae_log_chat_common.js?adkey=trvbf"
          strategy="afterInteractive"
          charSet={"UTF-8"}
        />
        <Analytics />
      </body>
    </html>
  );
}
