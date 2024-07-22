"use client";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { DropDown, TextField } from "@/app/components/utils/Form";
import { Gender, Religion } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";

export default function PersonalData() {
  const [formData, setFormData] = React.useState({
    name: "",
    class: "",
    absent: "",
    dateBirth: "",
    gender: "",
    religion: "",
  });
  const router = useRouter();
  const { data: session, status } = useSession();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/isiIdentitas/achievement");
  };
  return (
    <>
      <main className="mt-[150px] flex w-full">
        <div className="mx-auto h-auto">
          <p className="opacity-80 font-[400] text-[18px]">Isi Identitas</p>
          <h1 className="text-[48px] font-[700] opacity-60">Personal Data</h1>
          <form onSubmit={handleSubmit} className="mt-[40px] grid gap-0 xl:gap-[105px] grid-cols-1 lg:grid-cols-2">
            <div>
              <TextField name="name" placeholder="Insert your name" label="Name" type="text" required />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-x-[55px]">
                <TextField name="class" placeholder="Insert your class" label="Class" type="text" required />
                <TextField name="absent" placeholder="Insert your absent" label="Absent" type="text" required />
              </div>
              <TextField name="dateBirth" placeholder="Insert your Birth Date" label="Birth Date" type="date" required />
              <DropDown
                options={Object.values(Gender).map((x) => ({
                  label: x,
                  value: x,
                }))}
                name="Gender"
                label="Gender"
                required
              />
              <DropDown
                options={Object.values(Religion).map((x) => ({
                  label: x,
                  value: x,
                }))}
                name="Religion"
                label="Religion"
                required
              />
            </div>
            <div id="1">
              <TextField label="NIS" name="NIS" type="text" placeholder="Insert your NIS" />
              <TextField label="NISN" name="NISN" type="text" placeholder="Insert your NISN" />
              <TextField label="Phone" name="Phone" type="number" placeholder="Insert your Phone Number" />
              <TextField label="School origin" name="schoolOrigin" type="text" placeholder="Insert your School origin" />
              <div>
                <TextField label="Skills" name="Skills" type="text" placeholder="Insert your Skills" />
              </div>
              <div className="flex justify-between my-6 xl:my-12">
                <div className="flex gap-[45px] items-center justify-end w-full">
                  <LinkButton variant="white" href="/profile">
                    Skip
                  </LinkButton>

                  <FormButton type="submit" className="text-[20px]" variant="base">
                    Save Identity
                  </FormButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
