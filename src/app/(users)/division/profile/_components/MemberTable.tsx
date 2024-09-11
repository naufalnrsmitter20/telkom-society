"use client";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { Prisma } from "@prisma/client";
import clsx from "clsx";
import React, { useState } from "react";
import AddMember from "./AddMember";
import Link from "next/link";

export default function MemberTable({
  teamMember,
  teamRequest,
  data,
}: {
  teamMember: Prisma.TeamMemberGetPayload<{ include: { user: true } }>[];
  teamRequest: Prisma.TeamRequestGetPayload<{ include: { sender: true; receiver: true } }>[];
  data: Prisma.UserGetPayload<{ include: { Team: true } }>[];
}) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="mt-16">
        <h2 className="text-xl font-semibold">Member</h2>
        <FormButton variant="base" onClick={() => setModal(true)} className="">
          Tambah Anggota
        </FormButton>
        <table className="table-auto w-full mt-7 mb-5">
          <p className="text-[18px] text-green-400">Verified Member</p>
          <tbody>
            {teamMember.length > 0 ? (
              teamMember.map((x, i) => (
                <tr key={i} className="flex justify-between items-center">
                  <td className="w-2/3">
                    <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>{x.user ? x.user.name : ""}</p>
                  </td>
                  <td className="flex justify-end space-x-4 w-1/3">
                    <button className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">View</button>
                    <button className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">Kick</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  {" "}
                  <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>Belum Ada Anggota</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <table className="table-auto w-full mt-7 mb-5">
          <p className="text-[18px] text-red-400">Pending Member</p>
          <tbody>
            {teamRequest.length > 0 ? (
              teamRequest.map((x, i) => (
                <tr key={i} className="flex justify-between items-center">
                  <td className="w-2/3">
                    <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>{x.receiver ? x.receiver.name : ""}</p>
                  </td>
                  <td className="flex justify-end space-x-4 w-1/3">
                    <Link href={""} className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">
                      Detail
                    </Link>
                    <button className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">Cancel</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  {" "}
                  <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>Belum Ada Anggota</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {modal && <AddMember data={data} onClose={() => setModal(false)} />}
    </>
  );
}
