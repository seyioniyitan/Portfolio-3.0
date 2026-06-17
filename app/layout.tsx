import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactLenis } from "lenis/react";

import "./globals.css";

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <ReactLenis
          root
          options={{ lerp: 0.1, duration: 1, smoothWheel: true }}
        />
        {children}
      </body>
    </html>
  );
}
