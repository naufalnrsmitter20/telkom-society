"use client";
import { CancelInviteMember } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function CancelInvite({ reqId }: { reqId: string }) {
  const router = useRouter();
  const HandleCancel = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure to cancel this invitation?");
      if (!confirmation) return;
      const cancel = await CancelInviteMember(reqId);
      if (cancel) {
        const toastId = toast.loading("Loading...");
        toast.success("Success to cancel invitation!", { id: toastId });
      }
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <button onClick={HandleCancel} type="button" className="bg-red-500  w-full scale-75 sm:scale-75 lg:scale-100 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300">
      Cancel
    </button>
  );
}
