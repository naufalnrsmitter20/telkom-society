"use client";
import { FormButton } from "@/app/components/utils/Button";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { mentor } from "@/types/mentor";
import { UpdateTeam } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function EditTeam({ onClose, teamId, data }: { onClose: () => void; teamId: string; data: any }) {
  const router = useRouter();
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      await UpdateTeam(teamId, formData);
      const toastId = toast.loading("Loading...");
      toast.success("Sukses Mengedit Tim!", { id: toastId });
      router.refresh();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Gagal Mwngedit Tim!");
    }
  };
  return (
    <ModalProfile onClose={onClose} title="Edit Team">
      <form onSubmit={HandleSubmit}>
        <div className="gap-x-6 w-full">
          <TextField defaultValue={data.name} name="name" placeholder="Insert division name" label="Division Name" type="text" />
          <TextArea defaultValue={data.description} name="description" label="Division Description" placeholder="Division Description" />
          <TextField defaultValue={data.logo} name="logo" label="Division Logo" type="text" />
          <DropDown
            name="mentor"
            label="Mentor"
            defaultValue={data.mentor}
            options={mentor.map((x, i) => ({
              label: x.name,
              value: x.name,
            }))}
          />
          <TextField defaultValue={data.instagram} name="instagram" label="Instagram (link)" type="text" />
          <TextField defaultValue={data.linkedin} name="linkedin" label="Linked In (link)" type="text" />
        </div>
        <div className="flex justify-end w-full gap-x-4 pb-4 mt-12">
          <FormButton onClick={onClose} variant="white">
            Close
          </FormButton>
          <FormButton type="submit" variant="base">
            <div className="flex gap-x-3 items-center">Edit</div>
          </FormButton>
        </div>
      </form>
    </ModalProfile>
  );
}
