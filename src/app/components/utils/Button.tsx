import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  variant?: "base" | "white" | "disable";
  withArrow?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

interface LinkButtonProops extends ButtonProps {
  href: string;
}
export default function LinkButton({ className, children, variant, withArrow, href }: LinkButtonProops) {
  const baseButton = variant === "base";
  const whiteButton = variant === "white";
  const disableButton = variant === "disable";
  if (baseButton) {
    return (
      <Link href={href} className={`focus:outline-none text-white bg-base hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} flex w-fit items-center`}>
        {withArrow && (
          <svg width="12" className="mr-2" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.8" d="M1 1.00073L6 6.00073L11 1.00073" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {children}
      </Link>
    );
  } else if (whiteButton) {
    return (
      <Link href={href} className={`focus:outline-none text-black bg-white hover:bg-slate-100 focus:ring focus:ring-slate-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} `}>
        {children}
      </Link>
    );
  } else if (disableButton) {
    return (
      <Link href={href} className={`focus:outline-none text-black bg-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className} `}>
        {children}
      </Link>
    );
  }
}
