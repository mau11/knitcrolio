import type { Metadata } from "next";
import { Leckerli_One, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@components/NavBar";
import Footer from "@components/Footer";

const leckerli = Leckerli_One({
  weight: "400",
  variable: "--font-leckerli-one",
});

const nunito = Nunito({
  weight: "400",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "knitcrolio",
  description: "Your cozy companion for logging knitting & crochet projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leckerli.variable} ${nunito.variable} max-w-[90vw] lg:max-w-[70vw] mx-auto overflow-x-hidden`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
