import Sidebar from "@/app/components/utils/Sidebar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./../../globals.css";
import ProfileAdmin from "./components/main/ProfileAdmin";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin | Telkom Society",
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
        <div className="absolute top-4 right-4">
          <ProfileAdmin />
        </div>
        <div className="flex">
          <Sidebar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
