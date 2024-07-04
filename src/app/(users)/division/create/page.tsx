"use client";
import Form from "@/app/components/utils/Form";
import { FormButton } from "@/app/components/utils/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function createPage() {
  const router = useRouter();
  return (
    <main className="flex w-full h-screen flex-col">
      <h1 className="text-[48px] font-bold opacity-60 ml-[78px] mt-32">
        Create Division
      </h1>
      <div className="flex mx-auto gap-[80px]">
        <div>
          <Form
            variants="medium"
            formName="divName"
            formPlaceholder="Insert division name"
            formText="Division Name"
            formType="text"
          />
          <Form
            variants="big"
            formName="divDesc"
            formText="Division Description"
          />
        </div>
        <div>
          <Form
            variants="medium"
            formName="divLogo"
            formText="Division Logo"
            formType="file"
          />
          <Form
            variants="dropdown"
            dropvar="mentor"
            formName="divMentor"
            formText="Mentor"
            formType="text"
          />

          <div className="flex gap-[55px]">
            <Form
              variants="small"
              formName="divInstagram"
              formText="Instagram (link)"
            />
            <Form
              variants="small"
              formName="divLinkedIn"
              formText="Linked In (link)"
            />
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
