"use client";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { useRouter } from "next/navigation";
import { mentor } from "@/types/mentor";
import { ChangeEvent, useState } from "react";
import { CreateTeam } from "@/utils/server-action/teamsActions";
import toast from "react-hot-toast";
import Image from "next/image";
import { teacherPayloadMany, userWithTeacherPayloadMany } from "@/utils/relationsip";

export default function CreateTeamPage({ data }: { data: teacherPayloadMany }) {
  const router = useRouter();
  const [logo, setLogo] = useState("");

  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const toastId = toast.loading("Loading...");
      const formData = new FormData(e.target);
      const logoStream = formData.get("logo") as File | undefined;
      if (logoStream?.name === "") return toast.error("Please select a file", { id: toastId });
      formData.append("logo", logo);
      const create = await CreateTeam(formData);
      if (create) {
        toast.success("Sukses membuat Tim!", { id: toastId });
        router.push(`/division/profile/${create.id}`);
      } else {
        toast.error("Gagal membuat Tim!", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <main className="flex w-full min-h-screen flex-col">
      <h1 className="text-[48px] font-bold opacity-60 text-center mt-32 mb-12">Create Division</h1>
      <form onSubmit={HandleSubmit}>
        <div className="grid grid-cols-1 px-6 lg:px-0 lg:grid-cols-2 max-w-screen-2xl w-full gap-x-[80px] mx-auto">
          <div>
            <TextField name="name" placeholder="Insert division name" label="Division Name" type="text" />
            <TextArea name="description" label="Division Description" placeholder="Division Description" />
          </div>
          <div>
            <TextField name="logo" label="Division Logo" type="file" handleChange={(e) => setLogo(URL.createObjectURL(e.target.files![0]))} />
            {logo && <Image width={100} height={100} className="w-44 h-44 mb-8" src={logo as string} alt={"Team Logo"} />}
            <DropDown
              name="mentorId"
              label="Mentor"
              options={data.map((x) => ({
                label: x.user.name,
                value: x.id,
              }))}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <TextField name="instagram" label="Instagram (username)" type="text" />
              <TextField name="linkedin" label="Linked In (username)" type="text" />
            </div>
            <div className="justify-between flex mt-24">
              <div className="gap-x-4 flex justify-end w-full">
                <LinkButton variant="white" href="/division">
                  Cancel
                </LinkButton>
                <FormButton type="submit" variant="base">
                  Create
                </FormButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
