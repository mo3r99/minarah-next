import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import NavMenu from "@/components/layout/NavMenu/NavMenu";
import Providers from "@/lib/context/providers";

const figTree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Minarah - Salah Times",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figTree.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <NavMenu />
        </Providers>
      </body>
    </html>
  );
}
