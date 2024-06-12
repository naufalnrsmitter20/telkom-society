import React from "react";
import Form from "@/app/components/utils/Form";
import { LinkButton } from "@/app/components/utils/Button";
import Link from "next/link";

export default function IsiIdentitas() {
  return (
    <main className="mt-[150px] flex w-full">
      <div className="mx-auto h-auto">
        <h1 className="text-[48px] font-[700] opacity-60">Personal Data</h1>
        <form className="mt-[40px] flex gap-0 xl:gap-[105px] flex-col xl:flex-row">
          <div className="flex flex-col">
            <Form
              variants="medium"
              formName="name"
              formPlaceholder="Insert your name"
              formText="Name"
              formType="text"
            />
            <div className="flex flex-col xl:flex-row">
              <Form
                variants="small"
                formName="class"
                formPlaceholder="Insert your class"
                formText="Class"
                formType="text"
              />
              <Form
                className="xl:ml-[55px] ml-0"
                variants="small"
                formName="absent"
                formPlaceholder="Insert your absent"
                formText="Absent"
                formType="text"
              />
            </div>
            <Form
              variants="medium"
              formName="dateBirth"
              formPlaceholder="Insert your Birth Date"
              formText="Birth Date"
              formType="date"
            />
            <Form
              variants="dropdown"
              formType=""
              formName=""
              formText="Gender"
              dropvar="gender"
            />
            <Form
              variants="dropdown"
              formType=""
              formName=""
              formText="Religion"
              dropvar="religion"
            />
          </div>
          <div>
            <Form
              variants="medium"
              formText="NIS"
              formName="NIS"
              formType="text"
              formPlaceholder="Insert your NIS"
            />
            <Form
              variants="medium"
              formText="NISN"
              formName="NISN"
              formType="text"
              formPlaceholder="Insert your NISN"
            />
            <Form
              variants="medium"
              formText="Phone"
              formName="Phone"
              formType="text"
              formPlaceholder="Insert your Phone Number"
            />
            <Form
              variants="medium"
              formText="School origin"
              formName="schoolOrigin"
              formType="text"
              formPlaceholder="Insert your School origin"
            />
            <Form
              variants="medium"
              formText="Skill"
              formName="Skill"
              formType="text"
              formPlaceholder="Insert your Skill"
            />
            <div className="flex justify-between my-6 xl:my-12">
              <div></div>
              <div className="flex gap-[45px] items-center ">
                <Link href="..">Skip</Link>
                <button title="submit">
                  <LinkButton href=".." className="text-[20px]" variant="base">
                    Save Identity
                  </LinkButton>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
