"use client";
import { usePathname } from "next/navigation";

interface FooterProps {
  variants?: "red" | "invis";
}

export default function Footer({ variants }: FooterProps) {
  const pathname = usePathname();
  const redFooter = variants === "red";
  const invisFooter = variants === "invis";
  const redPathName = ["/", "/InformasiPilihan"];
  const invisPathName = ["/signin", "/pilihKeahlian", "/pengembang", "/isiIdentitas", "/partner"];

  const isRedFooter = redPathName.includes(pathname);
  const isInvisFooter = invisPathName.includes(pathname);

  if (redFooter || isRedFooter) {
    return (
      <footer className="flex justify-center items-center h-16 relative bottom-0 left-0 right-0 z-10 bg-red-500 text-white mt-10 lg:mt-0">
        <p className="text-center">© 2024 - SMK Telkom Malang</p>
      </footer>
    );
  } else if (invisFooter || isInvisFooter) {
    return (
      <footer className="flex justify-center items-center h-16 bg-transparent text-black">
        <p className="text-center opacity-50">© 2024 - SMK Telkom Malang</p>
      </footer>
    );
  }

  return null;
}
