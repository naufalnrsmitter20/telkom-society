import React, { useEffect, useState } from "react";
import AdminHeaders from "./components/main/AdminHeaders";
import { findAllUsers } from "@/utils/user.query";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import TableUser from "./components/main/TableUser";
import { FormButton } from "@/app/components/utils/Button";
import Table from "./studentData/_components/Table";

interface cardProps {
  title: string;
  data: number | string;
  desc: string;
}

export default async function AdminPage() {
  const dataUser = await findAllUsers({
    AND: [{ NOT: { role: "ADMIN" } }, { NOT: { role: "GURU" } }],
  });
  const dataGuru = await findAllUsers({
    AND: [{ NOT: { role: "SISWA" } }, { NOT: { role: "ADMIN" } }],
  });
  const dataAdmin = await prisma.user.findMany({
    where: {
      AND: [{ NOT: { role: "SISWA" } }, { NOT: { role: "GURU" } }],
    },
    include: { userAuth: true },
  });
  const dataTim = await prisma.team.findMany();

  const CardItem: cardProps[] = [
    {
      title: "Number of student",
      data: dataUser.length,
      desc: "Malang Telkom Vocational School Students",
    },
    {
      title: "Number of Team",
      data: dataTim.length,
      desc: "Malang Telkom Vocational School Teams",
    },
    {
      title: "Number of Mentor",
      data: dataGuru.length,
      desc: "Malang Telkom Vocational School Mentors",
    },
    {
      title: "Number of Achievement",
      data: "0",
      desc: "Malang Telkom Vocational School Achievements",
    },
  ];
  return (
    <div className="flex flex-col relative">
      <section className="w-full">
        <AdminHeaders data="Dashboard" />
        <section className="max-w-[1440px] ml-[20px] p-4 outline outline-1 outline-slate-200 mx-auto w-full bg-[#F6F6F6]">
          <h5 className="text-[24px] font-semibold text-[#F45846]">Statistik Data</h5>
          <div className="grid grid-cols-4 p-4 gap-x-4">
            {CardItem.map((x, i) => (
              <div key={i} className="p-6 bg-white drop-shadow rounded-[12px]">
                <p className="text-[16px] font-normal">{x.title}</p>
                <div className="mt-6">
                  <h6 className="text-[40px] font-medium text-[#F45846]">{x.data}</h6>
                  <p className="text-[14px] font-normal">{x.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
      <TableUser dataAdmin={dataAdmin} />

      {/* <button className="w-[100px] h-[100px] text-white text-lg font-medium text-center items-center flex justify-center rounded-full fixed z-[10000] right-10 bottom-10 bg-[#F45846]"> add </button> */}
    </div>
  );
}
