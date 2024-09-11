"use client";
import { FormButton } from "@/app/components/utils/Button";
import { AcceptInviteMember } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function Accept({ reqId, teamId }: { reqId: string; teamId: string }) {
  const router = useRouter();
  const HandleAcc = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const confirmation = confirm("Are you sure to join this team?");
      if (!confirmation) return;
      const acc = await AcceptInviteMember(reqId);
      if (acc) {
        const toastId = toast.loading("Loading...");
        toast.success("Success to accept member", { id: toastId });
      }
      router.push(`/division/profile/${teamId}`);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <div>
      <FormButton onClick={HandleAcc} variant="base">
        Accept
      </FormButton>
    </div>
  );
}
