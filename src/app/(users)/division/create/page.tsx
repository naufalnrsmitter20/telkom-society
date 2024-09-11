"use client";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Religion } from "@prisma/client";
import { mentor } from "@/types/mentor";
import { ChangeEvent } from "react";
import { CreateTeam } from "@/utils/server-action/teamsActions";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();
  const HandleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const create = await CreateTeam(formData);
      if (create) {
        const toastId = toast.loading("Loading...");
        toast.success("Sukses membuat Tim!", { id: toastId });
        router.push(`/division/profile/${create.id}`);
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
        <div className="grid grid-cols-2 max-w-screen-2xl w-full gap-x-[80px] mx-auto">
          <div>
            <TextField name="name" placeholder="Insert division name" label="Division Name" type="text" />
            <TextArea name="description" label="Division Description" placeholder="Division Description" />
          </div>
          <div>
            <TextField name="logo" label="Division Logo" type="text" />
            <DropDown
              name="mentor"
              label="Mentor"
              options={mentor.map((x, i) => ({
                label: x.name,
                value: x.name,
              }))}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <TextField name="instagram" label="Instagram (link)" type="text" />
              <TextField name="linkedin" label="Linked In (link)" type="text" />
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
