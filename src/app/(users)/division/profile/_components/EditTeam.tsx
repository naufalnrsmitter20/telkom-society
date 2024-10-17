"use client";
import { FormButton } from "@/app/components/utils/Button";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { mentor } from "@/types/mentor";
import { UpdateTeam } from "@/utils/server-action/teamsActions";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function EditTeam({
  onClose,
  teamId,
  data,
  mentor,
}: {
  onClose: () => void;
  teamId: string;
  data: Prisma.TeamGetPayload<{ include: { member: true; requests: true; mentor: { include: { user: true } } } }>;
  mentor: Prisma.TeacherGetPayload<{ include: { user: true } }>[];
}) {
  const router = useRouter();
  const [logo, setLogo] = useState(data?.logo || "");
  const [dataMentor, setDataMentor] = useState<string | undefined>(data?.mentor?.id || undefined);
  const HandleMentorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValud = e.target.value;
    setDataMentor(selectedValud);
  };

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const toastId = toast.loading("Loading...");
      const formData = new FormData(e.target);
      formData.append("logo", logo);
      await UpdateTeam(teamId, formData);
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
          <TextField defaultValue={data?.name} name="name" placeholder="Insert division name" label="Division Name" type="text" />
          <TextArea defaultValue={data?.description} name="description" label="Division Description" placeholder="Division Description" />
          <TextField handleChange={(e) => setLogo(URL.createObjectURL(e.target.files[0]))} name="logo" label="Division Logo" type="file" />
          <Image width={100} height={100} unoptimized quality={100} className="w-44 h-44 mb-8" src={logo as string} alt={data?.name} />
          <DropDown
            name="mentorId"
            label="Mentor"
            value={dataMentor}
            handleChange={HandleMentorChange}
            options={mentor.map((x, i) => ({
              label: x.user.name,
              value: x.id,
            }))}
          />
          <TextField defaultValue={data?.instagram as string} name="instagram" label="Instagram (link)" type="text" />
          <TextField defaultValue={data?.linkedin as string} name="linkedin" label="Linked In (link)" type="text" />
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
