"use client";
import { FormButton } from "@/app/components/utils/Button";
import { DropDown, TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { InviteMember } from "@/utils/server-action/teamsActions";
import { Prisma } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function AddMember({ onClose, data }: { onClose: () => void; data: Prisma.UserGetPayload<{ include: { Team: true } }>[] }) {
  const [member, setMember] = useState<string>("");
  const HandleInvite = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const specUser = data.find((x) => x.id === member);
      await InviteMember(specUser?.id!);
      const toastId = toast.loading("Inviting member...");
      toast.success("Success to add member", { id: toastId });
      onClose();
    } catch (error) {
      toast.error((error as Error).message);
      console.error("Error inviting member:", error);
    }
  };
  return (
    <ModalProfile onClose={onClose} title="Add Member">
      <form onSubmit={HandleInvite}>
        <div className="flex items-center gap-x-6">
          <DropDown
            name="member"
            className="w-full"
            value={member}
            handleChange={(e) => setMember(e.target.value)}
            options={data.map((x, i) => ({
              label: `${x.name} - ${x.job}`,
              value: x.id,
            }))}
          />
        </div>
        <div className="flex justify-end w-full gap-x-4 pb-4 mt-12">
          <FormButton onClick={onClose} variant="white">
            Close
          </FormButton>
          <FormButton type="submit" variant="base">
            <div className="flex gap-x-3 items-center">Add</div>
          </FormButton>
        </div>
      </form>
    </ModalProfile>
  );
}
