import React, { useEffect, useState } from "react";
import AdminHeaders from "./components/main/AdminHeaders";
import { findAllUsers } from "@/utils/user.query";
import { Prisma } from "@prisma/client";
import Hero from "@/app/(admin)/admin/components/Hero/page";


interface cardProps {
  title: string;
  data: string;
  desc: string;
}

export default async function AdminPage() {
  const datas = await findAllUsers({
    NOT: { role: "SISWA" },
  });
  
  const CardItem: cardProps[] = [
    {
      title: "Number of student",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
    {
      title: "Number of Team",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
    {
      title: "Number of Mentor",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
    {
      title: "Number of Achievement",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
  ];
  return (
    <div className="flex flex-col relative">
      <section className="w-full">
        <AdminHeaders data="Dashboard" />
        <section className="max-w-[1440px] mx-auto w-full bg-[#F6F6F6] p-4">
          <h5 className="text-[24px] font-semibold text-[#F45846]">
            Statistik Data
          </h5>
          <div className="grid grid-cols-4 p-4 gap-x-4">
            {CardItem.map((x, i) => (
              <div key={i} className="p-6 bg-white drop-shadow rounded-[12px]">
                <p className="text-[16px] font-normal">{x.title}</p>
                <div className="mt-6">
                  <h6 className="text-[40px] font-medium text-[#F45846]">
                    {x.data}
                  </h6>
                  <p className="text-[14px] font-normal">{x.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
      <section className="w-full m-[10px]">
        <section className="max-w-[1440px] mx-auto w-full bg-[#F6F6F6] p-4">
          <h5 className="text-[40px] border-b-2 border-black font-bold mx-5 text-[#F45846] ">Admin</h5>
          <div className="grid grid-cols-1 grid-rows-3 p-4 gap-y-4">
            {datas.map((i,x) => (
                <Hero datas={datas} key={i}/>
            ))}
          </div>
        </section>
      </section>
      <button className="w-[100px] h-[100px] text-white text-lg font-medium text-center items-center flex justify-center rounded-full fixed z-[10000] right-10 bottom-10 bg-[#F45846]"> add </button>
    </div>
  );
}
