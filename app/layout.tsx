import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "./query-provider";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "Monie",
    template: "%s | Monie 1.0",
  },
  description:
    "Monie adalah aplikasi keuangan untuk mencatat transaksi, memantau saldo, dan memahami pola pengeluaran dengan lebih mudah.",
  verification: {
    google: "aWNC-dVpCVjb4h0JZ0MKa3Hm510TlbiuOemU5QJavo8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body>
        <NextTopLoader
          color="#ef4444"
          height={2}
          showSpinner={false}
          crawlSpeed={200}
        />
        <QueryProvider>
          <Toaster position="top-right" richColors closeButton />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
