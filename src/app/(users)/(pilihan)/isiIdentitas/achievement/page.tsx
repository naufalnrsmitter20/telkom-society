"use client";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { TextArea, TextField } from "@/app/components/utils/Form";
import { userFullPayload } from "@/utils/relationsip";
import { UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { Skill } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Achievement() {
  const router = useRouter();
  const [userData, setUserData] = useState<userFullPayload | null>(null);
  const { data: session, status } = useSession();
  const [skills, setSkills] = useState([""]);

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

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append("Skills", JSON.stringify(skills));
      await UpdateUserById(formData);
      toast.success("Sukses Mengisi Data");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Gagal Mengisi Data");
    }
  };
  if (status === "unauthenticated") return router.push("/");
  else if (status === "loading") return "Loading...";
  return (
    <>
      <main className="mt-[150px] flex w-full min-h-screen">
        <div className="mx-auto h-auto">
          <p className="opacity-80 font-[400] text-[18px]">Isi Identitas</p>
          <h1 className="text-[48px] font-[700] opacity-60">Achievement</h1>
          <form onSubmit={handleSubmit} className="mt-[40px] grid gap-0 xl:gap-[105px] grid-cols-1 lg:grid-cols-2">
            <div>
              <TextArea defaultValue={userData?.biography as string} name="biography" placeholder="type your Biography" label="Biography" />
              <div>{/* <TextField label="Certificate" name="certificates" type="text" placeholder="Achievement Name" /> */}</div>
            </div>
            <div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-x-[55px]">
                <TextField defaultValue={userData?.instagram as string} name="instagram" placeholder="Instagram Username" label="Instagram Username" type="text" />
                <TextField defaultValue={userData?.github as string} name="github" placeholder=" Github Username" label="Github Username" type="text" />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-x-[55px]">
                <TextField defaultValue={userData?.whatsapp as string} name="whatsapp" placeholder="Whatsapp Number" label="Whatsapp Number" type="text" />
                <TextField defaultValue={userData?.linkedin as string} name="linkedin" placeholder=" Linkedin Username" label="Linkedin Username" type="text" />
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
