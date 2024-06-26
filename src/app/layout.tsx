import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Navbar from "@/components/Organisms/Navbar";
import QueryProvider from "@/providers/QueryClient";
import { Toaster } from "sonner";
import StoreProvider from "@/providers/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopei",
  description: "Native Production",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider>
            <AntdRegistry>
              <Toaster richColors />
              <Navbar />
              {children}
            </AntdRegistry>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
