"use client";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { Prisma } from "@prisma/client";
import clsx from "clsx";
import React, { useState } from "react";
import AddMember from "./AddMember";
import Accept from "./actions/Accept";
import Decline from "./actions/Decline";
import CancelInvite from "./actions/CancelInvite";
import KickMember from "./actions/KickMember";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MemberTable({
  teamMember,
  teamRequest,
  teamOwner,
  data,
  session,
}: {
  teamMember: Prisma.TeamMemberGetPayload<{ include: { user: true } }>[];
  teamRequest: Prisma.TeamRequestGetPayload<{ include: { sender: true; receiver: true } }>[];
  teamOwner: Prisma.TeamMemberGetPayload<{ include: { user: true } }>;
  data: Prisma.UserGetPayload<{ include: { Team: true; invitation: true; teamRequest: true } }>[];
  session: Session;
}) {
  const [modalData, setModalData] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <div className="mt-16 max-w-full">
        <div className="my-6">
          <h2 className="text-xl font-semibold mb-3">Owner</h2>
          <div className="flex items-center gap-x-6">
            <Image src={(teamOwner?.user?.photo_profile as string) || "https://res.cloudinary.com/mokletorg/image/upload/f_auto,q_auto/user"} width={42} height={42} className="rounded-full" alt={teamOwner.user.name} />

            <p className={clsx("text-sm sm:text-sm mt-1 md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>{teamOwner.user.name}</p>
            <p className={clsx("text-sm sm:text-sm mt-1 md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>{teamOwner.user.job}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold">Member</h2>
        {teamOwner.role === "OWNER" && teamOwner.userId === session.user?.id ? (
          <FormButton variant="base" onClick={() => setModalData(true)} className="mb-7">
            Tambah Anggota
          </FormButton>
        ) : (
          <></>
        )}

        <table className="table-auto w-full mb-5 mt-5">
          <tbody>
            {teamMember.length > 0 ? (
              teamMember.map((x, i) => (
                <tr key={i} className="flex justify-between items-center">
                  <td className="w-fit mr-4">
                    <Image src={x.user.photo_profile as string} width={100} height={100} className="rounded-full" alt={x.user.name} />
                  </td>
                  <td className="w-full">
                    <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>{x.user ? x.user.name : ""}</p>
                  </td>
                  <td className="w-full">
                    <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>{x.user ? x.user.job : ""}</p>
                  </td>
                  {teamOwner.userId === session.user?.id ? (
                    <td className="flex justify-end space-x-4 w-1/3">
                      <button className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">View</button>
                      <KickMember teamMId={x.id} />
                    </td>
                  ) : (
                    <td className="flex justify-end space-x-4 w-1/3">
                      <button onClick={() => router.push(`/partner/user/profile/${x.userId}`)} className="bg-red-500 scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>Belum Ada Anggota</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <table className="table-auto w-full mt-7 mb-5">
          {teamRequest.find((x) => x.status === "PENDING") && <p className="text-[18px] text-red-400">Pending Member</p>}
          <tbody>
            {teamRequest.length > 0 ? (
              teamRequest.map(
                (x, i) =>
                  x.status === "PENDING" && (
                    <tr key={i} className="flex justify-between items-center space-y-5">
                      <td className="w-1/3">
                        <p className={clsx("text-sm pt-5 lg:text-[16px] xl:text-[16px] text-black  font-semibold")}>{x.receiver ? x.receiver.name : ""}</p>
                      </td>
                      <td className="w-1/3">
                        <p className={clsx("text-sm lg:text-[16px] xl:text-[16px] text-black  font-semibold")}>{x.receiver ? x.receiver.job : ""}</p>
                      </td>
                      {x.type === "INVITE" && x.status === "PENDING" ? (
                        x.senderId === session.user?.id ? (
                          <td className="flex w-1/3 space-x-4">
                            <button className="bg-red-500 w-full scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">Detail</button>
                            <CancelInvite title="cancel" reqId={x.id} />
                          </td>
                        ) : (
                          <td></td>
                        )
                      ) : (
                        <>
                          {x.type === "INVITE" ? (
                            x.senderId === session.user?.id ? (
                              <td className="flex w-1/3 space-x-4">
                                {x.status !== "PENDING" ? <p className="text-[16px] text-green-400 font-medium w-full">{x.status} Invitation</p> : <p className="text-[16px] text-red-400 font-medium "> {x.status} Invitation</p>}
                                <CancelInvite title="delete" reqId={x.id} />
                              </td>
                            ) : (
                              <></>
                            )
                          ) : session.user?.id === teamOwner.userId ? (
                            <td className="flex w-1/3 space-x-4">
                              <Accept reqId={x.id} teamId={x.teamId} />
                              <Decline reqId={x.id} teamId={x.teamId} />
                            </td>
                          ) : (
                            <td className="flex w-1/3 space-x-4"></td>
                          )}
                        </>
                      )}
                    </tr>
                  )
              )
            ) : (
              <tr>{/* <p className={clsx("text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px] text-black md:text-black lg:text-black font-semibold")}>Belum Ada Anggota</p> */}</tr>
            )}
          </tbody>
        </table>
      </div>
      {modalData && <AddMember data={data} onClose={() => setModalData(false)} />}
    </>
  );
}
