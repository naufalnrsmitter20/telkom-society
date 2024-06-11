import type { Metadata } from "next";
import { Inter, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "./components/utils/Navbar";
import Footer from "./components/utils/Footer";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telkom Society",
  description: "Find the Best Competition Partner to Succeed Together!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        {children}
        <Footer variants="red" />
      </body>
    </html>
  );
}
