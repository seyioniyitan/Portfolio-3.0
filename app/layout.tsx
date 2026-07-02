import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  description:
    "Seyi Oniyitan | Generalist designer transforming ideas into products, maximising business impact and the friend of your ambitious imaginations.",
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
