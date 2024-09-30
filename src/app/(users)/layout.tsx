import type { Metadata } from "next";
import { Inter, Poppins, Quicksand } from "next/font/google";
import "../globals.css";

import AuthProviders from "@/lib/AuthProvider";
import { Toaster } from "react-hot-toast";
import ProgressBarProvider from "@/lib/ProgressBar";
import Navbar from "../components/utils/Navbar";
import Footer from "../components/utils/Footer";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Telkom Society",
  description: "Find the Best Competition Partner to Succeed Together!",
  authors: [
    {
      name: "Naufal Nabil Ramadhan",
      url: "https://naufalnr.my.moklet.org/",
    },
    {
      name: "Jean Richnerd Rantabaratrahjaga",
      url: "#",
    },
    {
      name: "Haza Nasrullah Kuswantoro",
      url: "http://hazanasrullah.me/",
    },
    {
      name: "Ryo Hariyono Angwyn",
      url: "#",
    },
  ],
  keywords: ["SMK Telkom Malang", "Telkom Society", "Find the Best Team", "Hipster", "Hustler", "Hacker", "Telkom Schools", "Create Team", "Find Partner", "Competition"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} overflow-x-hidden`}>
        <AuthProviders>
          <ProgressBarProvider>
            <Navbar />
            {children}
            <Footer variants="red" />
            <Toaster />
          </ProgressBarProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
