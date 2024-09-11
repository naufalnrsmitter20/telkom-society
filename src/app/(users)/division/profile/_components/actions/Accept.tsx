"use client";
import { FormButton } from "@/app/components/utils/Button";
import { AcceptInviteMember, AcceptRequest } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function Accept({ reqId, teamId }: { reqId: string; teamId: string }) {
  const router = useRouter();
  const HandleAcc = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure to accept this member?");
      if (!confirmation) return;
      const acc = await AcceptRequest(reqId);
      if (acc) {
        const toastId = toast.loading("Loading...");
        toast.success("Success to accept member", { id: toastId });
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <button onClick={HandleAcc} type="button" className="bg-red-500 w-full scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">
      Accept
    </button>
  );
}
