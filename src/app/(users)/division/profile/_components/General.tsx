"use client";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import React, { ChangeEvent, useState } from "react";
import EditTeam from "./EditTeam";
import ViewTeam from "./ViewTeam";
import { Prisma } from "@prisma/client";
import toast from "react-hot-toast";
import { deleteTeam } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";

export default function General({ profile, teamId, userId }: { profile: Prisma.TeamGetPayload<{ include: { member: true; requests: true } }>; teamId: string; userId: string }) {
  const [modal, setModal] = useState(false);
  const [view, setView] = useState(false);
  const router = useRouter();
  const delTeam = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure you want to delete this team?");
      const toastId = toast.loading("Deleting Team...");
      if (confirmation) {
        const del = await deleteTeam(teamId);
        if (!del) {
          toast.error(del, { id: toastId });
        }
        toast.success(del.message, { id: toastId });
        router.push("/division");
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.error("Error deleting team:", error);
    }
  };
  return (
    <div>
      <div className="tracking-wide font-semibold text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">{profile?.name}</div>
      <p className="block mt-2 text-sm text-black sm:text-sm lg:text-text-[16px] xl:text-[18px] leading-tight font-semibold">{profile?.description}</p>
      <div className="lg:flex lg:justify-between mt-4">
        <div>
          <p className="mt-2 text-black text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px]">
            Mentor: <span className="font-semibold"> {profile?.mentor}</span>
          </p>
          <p className="mt-2 text-black text-sm sm:text-sm md:text-sm lg:text-[16px] xl:text-[16px]">
            Team ID: <span className="font-semibold">{profile?.id}</span>
          </p>
        </div>
        <div className="flex space-x-0 lg:ml-20 mt-6 lg:mt-0">
          {userId === profile?.ownerId ? (
            <FormButton variant="base" onClick={() => setModal(true)}>
              Edit
            </FormButton>
          ) : (
            <FormButton variant="base" onClick={() => setView(true)}>
              Detail
            </FormButton>
          )}
          {userId === profile?.ownerId ? (
            <FormButton variant="base" onClick={delTeam}>
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
