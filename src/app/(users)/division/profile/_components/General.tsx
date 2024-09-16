"use client";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import React, { useState } from "react";
import EditTeam from "./EditTeam";
import ViewTeam from "./ViewTeam";

export default function General({ profile, teamId, userId }: { profile: any; teamId: string; userId: string }) {
  const [modal, setModal] = useState(false);
  const [view, setView] = useState(false);
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
          {userId === profile?.ownerId ? (
            <FormButton variant="base" onClick={() => setModal(true)}>
              Edit
            </FormButton>
          ) : (
            <FormButton variant="base" onClick={() => setView(true)}>
              View
            </FormButton>
          )}
          {userId === profile?.ownerId ? (
            <FormButton variant="base" onClick={() => setModal(true)}>
              Delete
            </FormButton>
          ) : (
            <></>
          )}
        </div>
      </div>
      {modal && <EditTeam data={profile} teamId={profile?.id} onClose={() => setModal(false)} />}
      {view && <ViewTeam data={profile} teamId={profile?.id} onClose={() => setView(false)} />}
    </div>
  );
}
