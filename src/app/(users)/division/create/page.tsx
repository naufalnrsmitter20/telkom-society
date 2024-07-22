"use client";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import { FormButton } from "@/app/components/utils/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Religion } from "@prisma/client";

export default function CreatePage() {
  const router = useRouter();
  return (
    <main className="flex w-full h-screen flex-col">
      <h1 className="text-[48px] font-bold opacity-60 ml-[78px] mt-32">Create Division</h1>
      <div className="flex mx-auto gap-[80px]">
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
            <div></div>
            <div className="gap-[64px] flex place-items-center">
              <Link href="/division">Cancel</Link>
              <FormButton
                variant="base"
                onClick={() => {
                  router.push("/");
                }}
                className="scale-150"
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
