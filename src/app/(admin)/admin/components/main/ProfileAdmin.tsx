import { nextGetServerSession } from "@/lib/authOption";
import Image from "next/image";
import React from "react";

export default async function ProfileAdmin() {
  const session = await nextGetServerSession();
  return (
    <div className="flex gap-x-4 items-center bg-[#F45846] py-2 px-2 pl-4 rounded-full">
      <p className="font-semibold text-[16px]">{session?.user?.name}</p>
      <Image src={session?.user?.image as string} width={40} height={40} alt="admin" className="rounded-full" />
    </div>
  );
}
