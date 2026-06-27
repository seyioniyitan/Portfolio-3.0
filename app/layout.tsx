import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { MobileMenuProvider } from "@/app/context/mobile-menu-context";
import PagePushWrapper from "./components/page-push";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Seyi Oniyitan",
  description: "Seyi Oniyitan's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        {/* <ReactLenis
          root
          options={{ lerp: 0.1, duration: 0.3, smoothWheel: true }}
        /> */}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <MobileMenuProvider>
            <PagePushWrapper>{children}</PagePushWrapper>
          </MobileMenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
