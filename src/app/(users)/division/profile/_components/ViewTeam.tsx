import { FormButton } from "@/app/components/utils/Button";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { mentor } from "@/types/mentor";
import { UpdateTeam } from "@/utils/server-action/teamsActions";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function ViewTeam({ onClose, teamId, data }: { onClose: () => void; teamId: string; data: Prisma.TeamGetPayload<{ include: { member: true; requests: true; mentor: { include: { user: true } } } }> }) {
  return (
    <ModalProfile onClose={onClose} title="View Team">
      <>
        <div className="gap-x-6 w-full">
          <TextField readOnly disabled defaultValue={data?.name} name="name" placeholder="Insert division name" label="Division Name" type="text" />
          <TextArea readOnly disabled defaultValue={data?.description} name="description" label="Division Description" placeholder="Division Description" />
          <label className="text-[17px] font-normal my-2">Division Logo</label>
          <Image src={data?.logo as string} alt={data?.name} width={200} height={200} unoptimized />
          <TextField readOnly disabled defaultValue={data?.mentor?.user.name} name="mentor" label="Mentor" type="text" />
          <TextField readOnly disabled defaultValue={data?.instagram as string} name="instagram" label="Instagram (link)" type="text" />
          <TextField readOnly disabled defaultValue={data?.linkedin as string} name="linkedin" label="Linked In (link)" type="text" />
        </div>
        <div className="flex justify-end w-full gap-x-4 pb-4 mt-12">
          <FormButton onClick={onClose} variant="white">
            Close
          </FormButton>
        </div>
      </>
    </ModalProfile>
  );
}
