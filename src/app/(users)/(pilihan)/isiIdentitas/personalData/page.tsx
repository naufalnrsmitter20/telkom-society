"use client";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import XIcon from "@/app/components/Icons/XIcon";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { DropDown, TextField } from "@/app/components/utils/Form";
import { userFullPayload, userWithLastLogin } from "@/utils/relationsip";
import { UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { findAllUsers, findUser } from "@/utils/user.query";
import { Gender, Project, Religion, Skill } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PersonalData() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [project, setProject] = useState<Project[]>([]);

  const [userData, setUserData] = useState<userFullPayload | null>(null);

  const { data: session, status } = useSession();

  const user = session?.user;

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/user?userId=${session.user?.id}`);
          if (response.ok) {
            const { user } = await response.json();
            setUserData(user);
            setSkills(user?.Skills.map((x: Skill) => x.SkillName) || [""]);
            setProject(user?.projects || [""]);
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const addSkill = () => {
    const existingSkill = skills.find((skil) => skil.trim().toLowerCase() === currentSkill.trim().toLowerCase());
    if (existingSkill) {
      toast.error("Keahlian sudah ada");
      return;
    } else if (currentSkill.trim() !== "") {
      setSkills([...skills, currentSkill]);
      setCurrentSkill("");
    }
  };
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // const handleSkillChange = (index: number, value: string) => {
  //   const newSkills = skills.slice();
  //   newSkills[index] = value;
  //   setSkills(newSkills);
  // };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append("Skills", JSON.stringify(skills));
      formData.append("projects", JSON.stringify(project));

      await UpdateUserById(formData);
      toast.success("Sukses Mengisi Data");
      router.push("/isiIdentitas/achievement");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Gagal Mengisi Data");
    }
  };
  if (status === "unauthenticated") return router.push("/signin");
  else if (status === "loading") return "Loading...";

  return (
    <>
      <main className="mt-[150px] flex w-full">
        <div className="mx-auto h-auto">
          <p className="opacity-80 font-[400] text-[18px]">Isi Identitas</p>
          <h1 className="text-[48px] font-[700] opacity-60">Personal Data</h1>
          <form onSubmit={handleSubmit} className="mt-[40px] grid gap-0 xl:gap-[105px] grid-cols-1 lg:grid-cols-2 max-w-7xl">
            <div>
              <TextField defaultValue={user?.name} readOnly placeholder="Insert your name" label="Name" type="text" required />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-x-[55px]">
                <TextField defaultValue={userData?.clasess as string} name="clasess" placeholder="Insert your class" label="Class" type="text" required />
                <TextField defaultValue={userData?.absent as string} name="absent" placeholder="Insert your absent" label="Absent" type="text" required />
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
              <TextField defaultValue={userData?.Phone as string} label="Phone" name="Phone" type="number" placeholder="Insert your Phone Number" />
              <TextField defaultValue={userData?.schoolOrigin as string} label="School origin" name="schoolOrigin" type="text" placeholder="Insert your School origin" />
              <div className="mb-6">
                <label className="text-[17px] font-normal">Skills</label>
              </div>
              {/* {skills.map((exp, i) => (
                <div key={i} className="flex items-center gap-x-3">
                  <TextField value={exp} handleChange={(e) => handleSkillChange(i, e.target.value)} label={`skill ${i + 1}`} name={`skills[${i}]`} type="text" placeholder="Insert your Skills" className="w-full" />
                  <button type="button" onClick={() => removeSkill(i)} className="text-red-500">
                    Remove
                  </button>
                </div>
              ))}
              <FormButton type="button" variant="base" onClick={addSkill}>
                Add
              </FormButton> */}
              <div className="flex items-center gap-x-3">
                <TextField value={currentSkill} handleChange={(e) => setCurrentSkill(e.target.value)} type="text" placeholder="Insert your Skills" name="skill" className="w-full" />
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
