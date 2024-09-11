"use client";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import EditTeam from "./EditTeam";

export default function General({ profile, teamId }: { profile: any; teamId: string }) {
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  return (
    <div>
      <div className="tracking-wide font-semibold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">{profile?.name}</div>
      <p className="block mt-2 text-sm text-black sm:text-sm lg:text-text-[16px] xl:text-[18px] leading-tight font-semibold">{profile?.description}</p>
      <div className="flex justify-between mt-4">
        <div>
          <p className="mt-2 text-gray-500 text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px]">Mentor: {profile?.mentor}</p>
          <p className="mt-2 text-gray-500 text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px]">ID: {profile?.id}</p>
        </div>
        <div className="flex space-x-0 ml-20">
          <LinkButton variant="base" href="/" className="px-4 py-2 scale-75 sm:scale-75 lg:scale-100 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
            Delete
          </LinkButton>
          {session?.user?.id === profile?.ownerId ? (
            <FormButton variant="base" onClick={() => setModal(true)} className="">
              Edit
            </FormButton>
          ) : (
            <LinkButton variant="base" href="/" className="">
              View
            </LinkButton>
          )}
        </div>
      </div>
      {modal && <EditTeam data={profile} teamId={profile.id} onClose={() => setModal(false)} />}
    </div>
  );
}
