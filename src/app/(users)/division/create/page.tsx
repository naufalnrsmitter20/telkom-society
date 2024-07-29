"use client";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Religion } from "@prisma/client";

export default function CreatePage() {
  const router = useRouter();
  return (
    <main className="flex w-full min-h-screen flex-col">
      <h1 className="text-[48px] font-bold opacity-60 text-center mt-32 mb-12">Create Division</h1>
      <div className="grid grid-cols-2 max-w-screen-2xl w-full gap-x-[80px] mx-auto">
        <div>
          <TextField name="divName" placeholder="Insert division name" label="Division Name" type="text" />
          <TextArea name="divDesc" label="Division Description" placeholder="Division Description" />
        </div>
        <div>
          <TextField name="divLogo" label="Division Logo" type="file" />
          <DropDown name="mentor" label="Mentor" options={Object.values(Religion).map((x) => ({ label: x, value: x }))} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
            <TextField name="divInstagram" label="Instagram (link)" type="text" />
            <TextField name="divLinkedIn" label="Linked In (link)" type="text" />
          </div>
          <div className="justify-between flex mt-24">
            <div className="gap-x-4 flex justify-end w-full">
              <LinkButton variant="white" href="/division">
                Cancel
              </LinkButton>
              <FormButton
                variant="base"
                onClick={() => {
                  router.push("/");
                }}
              >
                Create
              </FormButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
