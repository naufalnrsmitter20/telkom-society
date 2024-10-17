"use client";
import { FormButton } from "@/app/components/utils/Button";
import { DropDown, TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { InviteMember } from "@/utils/server-action/teamsActions";
import { Prisma } from "@prisma/client";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function AddMember({
  onClose,
  data,
  CurrentTeam,
}: {
  onClose: () => void;
  data: Prisma.UserGetPayload<{ include: { Team: true; Student: { include: { UserJob: true } } } }>[];
  CurrentTeam: Prisma.TeamGetPayload<{ include: { member: true; requests: true; mentor: { include: { user: true } } } }>;
}) {
  const userOptions = data.map((x) => ({ label: `${x.name} - ${x.Student?.UserJob?.jobName}`, value: x.id }));
  const HandleInvite = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Inviting member...");
      const formData = new FormData(e.target);
      const req = await InviteMember(formData, CurrentTeam.id);
      if (!req) {
        toast.error(req, { id: toastId });
      } else {
        toast.success(req.message, { id: toastId });
        onClose();
      }
    } catch (error) {
      toast.error((error as Error).message);
      console.error("Error inviting member:", error);
    }
  };
  return (
    <ModalProfile onClose={onClose} title="Add Member">
      <form onSubmit={HandleInvite}>
        <div className="flex items-center gap-x-6">
          <Select name="member" className="w-full" isMulti components={animatedComponents} options={userOptions} closeMenuOnSelect={false} />
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
