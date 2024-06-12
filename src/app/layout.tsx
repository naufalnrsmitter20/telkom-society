import type { Metadata } from "next";
import { Inter, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "./components/utils/Navbar";
import Footer from "./components/utils/Footer";
import AuthProviders from "@/lib/AuthProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

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
        <AuthProviders>
          <Navbar />
          {children}
          <Footer variants="red" />
        </AuthProviders>
      </body>
    </html>
  );
}
