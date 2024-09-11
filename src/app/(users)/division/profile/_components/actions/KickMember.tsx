"use client";
import { KickMember } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function KickMemberh({ teamMId }: { teamMId: string }) {
  const router = useRouter();

  const HandleKick = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure to kick this member?");
      if (!confirmation) return;
      const den = await KickMember(teamMId);
      if (den) {
        const toastId = toast.loading("Loading...");
        toast.success("Success to kick member", { id: toastId });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <button onClick={HandleKick} type="button" className="bg-gray-300 scale-75 sm:scale-75 lg:scale-100 text-black py-1 px-2 rounded-lg hover:bg-gray-400 transition duration-300">
      Kick
    </button>
  );
}
