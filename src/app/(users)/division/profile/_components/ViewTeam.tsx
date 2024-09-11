import { FormButton } from "@/app/components/utils/Button";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { mentor } from "@/types/mentor";
import { UpdateTeam } from "@/utils/server-action/teamsActions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import toast from "react-hot-toast";

export default function ViewTeam({ onClose, teamId, data }: { onClose: () => void; teamId: string; data: any }) {
  return (
    <ModalProfile onClose={onClose} title="View Team">
      <form>
        <div className="gap-x-6 w-full">
          <TextField readOnly disabled defaultValue={data?.name} name="name" placeholder="Insert division name" label="Division Name" type="text" />
          <TextArea readOnly disabled defaultValue={data?.description} name="description" label="Division Description" placeholder="Division Description" />
          <TextField readOnly disabled defaultValue={data?.logo} name="logo" label="Division Logo" type="text" />
          <TextField readOnly disabled defaultValue={data?.mentor} name="mentor" label="Mentor" type="text" />
          <TextField readOnly disabled defaultValue={data?.instagram} name="instagram" label="Instagram (link)" type="text" />
          <TextField readOnly disabled defaultValue={data?.linkedin} name="linkedin" label="Linked In (link)" type="text" />
        </div>
        <div className="flex justify-end w-full gap-x-4 pb-4 mt-12">
          <FormButton onClick={onClose} variant="white">
            Close
          </FormButton>
        </div>
      </form>
    </ModalProfile>
  );
}
