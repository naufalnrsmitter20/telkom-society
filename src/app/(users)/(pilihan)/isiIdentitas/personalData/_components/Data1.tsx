"use client";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import XIcon from "@/app/components/Icons/XIcon";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { DropDown, TextField } from "@/app/components/utils/Form";
import { UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { Gender, Prisma, Project, Religion, Skill } from "@prisma/client";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PersonalData({ session, userData }: { session: Session; userData: Prisma.UserGetPayload<{ include: { Skills: true; projects: true } }> }) {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>(userData.Skills.map((x) => x.SkillName));
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [project, setProject] = useState<Project[]>(userData.projects);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = session?.user;

  const addSkill = () => {
    const existingSkill = skills.find((skil) => skil.trim().toLowerCase() === currentSkill.trim().toLowerCase());
    if (existingSkill) {
      toast.error("Keahlian sudah ada");
      return;
    } else if (currentSkill.trim() !== "") {
      setSkills([...skills.map((x) => x), currentSkill]);
      setCurrentSkill("");
    }
  };
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      formData.append("Skills", JSON.stringify(skills));
      formData.append("projects", JSON.stringify(project));
      await UpdateUserById(formData);
      toast.success("Sukses Mengisi Data");
      setIsLoading(false);
      router.push("/isiIdentitas/achievement");
    } catch (error) {
      console.error("Failed to update user:", error);
      setIsLoading(false);
      toast.error("Gagal Mengisi Data");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  };

  return (
    <>
      <main className="mt-[150px] flex w-full">
        <div className="mx-auto h-auto">
          <p className="opacity-80 font-[400] text-[18px] px-6 lg:px-0">Isi Identitas</p>
          <h1 className="md:text-[48px] font-[700] opacity-60 px-6 lg:px-0 text-[40px]">Personal Data</h1>
          <form onSubmit={handleSubmit} className="mt-[40px] grid gap-0 xl:gap-[105px] grid-cols-1 px-6 lg:px-0 lg:grid-cols-2 max-w-7xl">
            <div>
              <TextField defaultValue={user?.name} readOnly disabled placeholder="Insert your name" label="Name" type="text" required />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-x-[55px]">
                <TextField defaultValue={userData?.clasess as string} name="clasess" placeholder="Ex. Format : XI RPL 6" label="Class" type="text" required />
                <TextField defaultValue={userData?.generation as string} name="generation" placeholder="Insert your generation" label="Generation" type="text" required />
              </div>
              <TextField name="BirthDate" defaultValue={userData?.BirthDate as string} placeholder="Insert your Birth Date" label="Birth Date" type="date" required />
              <DropDown
                options={Object.values(Gender).map((x) => ({
                  label: x,
                  value: x,
                }))}
                value={userData?.gender as string}
                name="gender"
                label="Gender"
                required
              />
              <DropDown
                options={Object.values(Religion).map((x) => ({
                  label: x,
                  value: x,
                }))}
                value={userData?.religion as string}
                name="religion"
                label="Religion"
                required
              />
            </div>
            <div id="1">
              <TextField defaultValue={userData?.NIS as string} label="NIS" name="NIS" type="text" placeholder="Insert your NIS" />
              <TextField defaultValue={userData?.NISN as string} label="NISN" name="NISN" type="text" placeholder="Insert your NISN" />
              <TextField defaultValue={userData?.whatsapp as string} label="Whatsapp" name="whatsapp" type="number" placeholder="Ex. Format: 62xxxx " required />
              <TextField defaultValue={userData?.schoolOrigin as string} disabled readOnly label="School origin" name="schoolOrigin" type="text" placeholder="Insert your School origin" />
              <div className="mb-6">
                <label className="text-[17px] font-normal">Skills</label>
              </div>
              <div className="flex items-center gap-x-3">
                <TextField onKeyDown={handleKeyDown} value={currentSkill} handleChange={(e) => setCurrentSkill(e.target.value)} type="text" placeholder="Insert your Skills" name="skill" className="w-full" />
                <FormButton type="button" variant="base" onClick={addSkill} className="mb-5">
                  <PlusIcon />
                </FormButton>
              </div>
              <div className="flex items-center gap-x-3 gap-y-3 flex-wrap">
                {skills.map((exp, i) => (
                  <div key={i} className="flex items-center gap-x-2 py-2 px-3 rounded-[8px] bg-base text-white">
                    <p>{exp}</p>
                    <button type="button" onClick={() => removeSkill(i)} className="">
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between my-6 xl:my-12">
                <div className="flex gap-[45px] items-center justify-end w-full">
                  <LinkButton variant="white" href="/profile">
                    Skip
                  </LinkButton>

                  <FormButton type="submit" className="text-[20px]" variant="base">
                    {!isLoading ? (
                      "Save Identity"
                    ) : (
                      <div className="flex gap-x-3 items-center">
                        <svg aria-hidden="true" className="inline w-5 h-5 animate-spin text-red-500 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span>Loading...</span>
                      </div>
                    )}
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
