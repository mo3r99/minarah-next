import type { Metadata } from "next";
import { Figtree } from "next/font/google";
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
      <body className={`${figTree.variable} font-(family-name:--font-figtree) antialiased`}>
        <Providers>
          <Header />
          <div className="md:ml-20 px-8 mt-2">
            {children}
          </div>
          <NavMenu />
        </Providers>
      </body>
    </html>
  );
}
