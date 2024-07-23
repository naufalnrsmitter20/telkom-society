"use client";
import React from "react";
import hipster from "@/../public/svg/hipsterP.png";
import hustler from "@/../public/svg/hustlerP.svg";
import hacker from "@/../public/svg/hackerP.png";
import setting from "@/../public/svg/settingsP.png";
import Link from "next/link";
import Image from "next/image";
import banner from "@/../public/img/banner ryo.png";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Asides() {
  const { data: session, status } = useSession();

  return (
    <div className="lg:w-2/5 grid grid-cols-1 gap-4">
      <div className="w-full bg-white rounded-3xl pb-6">
        <Image src={banner} alt="banner" className="w-full" />
        <div className="rounded-full overflow-hidden -mt-8 relative w-[60px] h-[60px] ml-4">
          <Image src={session?.user?.image as string} height={60} width={60} alt="image" className="absolute" />
        </div>
        <div className="ml-20 -mt-3">
          <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-black">{session?.user?.name}</p>
          <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-slate-600">{session?.user?.role}</p>
        </div>
      </div>
      <div className="w-full px-10 bg-white rounded-3xl py-4">
        <div className="py-4 font-Quicksand xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-light text-slate-500">Manage your partner</div>
        <hr />
        <div className="grid grid-cols-1">
          <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
            <Image src={hustler} width={30} alt="hustler" />
            <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Hustler</p>
          </Link>
          <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
            <Image src={hipster} width={30} alt="hustler" />
            <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Hipster</p>
          </Link>
          <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
            <Image src={hacker} width={30} alt="hustler" />
            <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Hacker</p>
          </Link>
          <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
            <Image src={setting} width={30} alt="hustler" />
            <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Setting</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
