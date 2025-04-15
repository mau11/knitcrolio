import type { Metadata } from "next";
import { Leckerli_One } from "next/font/google";
import "./globals.css";
import Navbar from "@components/NavBar";

const leckerli = Leckerli_One({
  weight: "400",
  variable: "--font-leckerli-one",
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
      <body className={leckerli.variable}>
        <Navbar />
        {children}
        <footer>
          <p>© 2025 knitcrolio </p>
        </footer>
      </body>
    </html>
  );
}
