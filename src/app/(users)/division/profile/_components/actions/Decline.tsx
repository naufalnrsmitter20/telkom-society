"use client";
import { FormButton } from "@/app/components/utils/Button";
import { DeniedInviteMember, DeniedRequest } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function Decline({ reqId, teamId }: { reqId: string; teamId: string }) {
  const router = useRouter();
  const HandleDecline = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure to decline this member?");
      if (!confirmation) return;
      const den = await DeniedRequest(reqId);
      if (den) {
        const toastId = toast.loading("Loading...");
        toast.success("Success to Decline member", { id: toastId });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <button onClick={HandleDecline} type="button" className="bg-red-500 w-full scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">
      Decline
    </button>
  );
}
