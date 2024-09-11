"use client";
import { FormButton } from "@/app/components/utils/Button";
import { nextGetServerSession } from "@/lib/authOption";
import { RequestTeam } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function JoinTeam({ teamId }: { teamId: string }) {
  const router = useRouter();
  const HandleJoin = async (e: ChangeEvent<any>) => {
    e.preventDefault();
    try {
      await RequestTeam(teamId);
      const toastId = toast.loading("Request to Join...");
      toast.success("Success to Request Join team!", { id: toastId });
      router.push("/profile/notification");
    } catch (error) {
      toast.error((error as Error).message);
      console.error("Error inviting member:", error);
    }
  };
  return (
    <div>
      <FormButton onClick={HandleJoin} variant="base">
        Join
      </FormButton>
    </div>
  );
}
