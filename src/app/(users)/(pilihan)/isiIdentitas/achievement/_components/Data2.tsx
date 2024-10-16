"use client";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import XIcon from "@/app/components/Icons/XIcon";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { TextArea, TextField } from "@/app/components/utils/Form";
import { UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { Prisma, Project } from "@prisma/client";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Achievement({ session, userData }: { session: Session; userData: Prisma.UserGetPayload<{ include: { Student: { include: { Skills: true; projects: true } } } }> }) {
  const router = useRouter();
  const [skills, setSkills] = useState(userData.Student?.Skills.map((x) => x.SkillName));
  const [project, setProject] = useState<Project[]>(userData?.Student?.projects || []);
  const [currentProject, setCurrentProject] = useState<Project>({ link: "", ProjeectName: "", teamId: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addProject = () => {
    const exixtingProject = project?.find((p) => p.ProjeectName.trim().toLowerCase() === currentProject.ProjeectName?.trim().toLowerCase());
    if (exixtingProject) {
      toast.error("Project Sudah Ada!");
      return;
    } else if (currentProject.ProjeectName?.trim() !== "" && currentProject.link?.trim() !== "") {
      setProject([...project, { ...currentProject }]);
      setCurrentProject({ ProjeectName: "", link: "", teamId: null });
    }
  };

  const removeProject = (index: number) => {
    setProject(project.filter((_, i) => i !== index));
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
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Gagal Mengisi Data");
      setIsLoading(false);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addProject();
    }
  };

  return (
    <>
      <main className="mt-[150px] flex w-full min-h-screen max-w-screen-2xl mx-auto">
        <div className="mx-auto h-auto">
          <p className="opacity-80 font-[400] text-[18px] px-6 lg:px-0">Isi Identitas</p>
          <h1 className="md:text-[48px] text-[40px] font-[700] px-6 lg:px-0 opacity-60">Achievement</h1>
          <form onSubmit={handleSubmit} className="mt-[40px] grid gap-0 xl:gap-[105px] px-6 lg:px-0 grid-cols-1 lg:grid-cols-2">
            <div>
              <TextArea defaultValue={userData?.Student?.biography as string} name="biography" placeholder="type your Biography" label="Biography" />
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
              <div className="mt-5 flex items-center justify-center h-fit gap-x-6">
                <div className="w-full">
                  <TextField
                    onKeyDown={handleKeyDown}
                    value={currentProject.ProjeectName as string}
                    handleChange={(e) => setCurrentProject({ ...currentProject, ProjeectName: e.target.value })}
                    type="text"
                    label="Add Project"
                    placeholder="Project Name"
                    className="w-full"
                  />
                  <TextField
                    onKeyDown={handleKeyDown}
                    value={currentProject.link as string}
                    handleChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                    type="text"
                    placeholder="Link to project"
                    className="w-full"
                  />
                </div>
                <div className="flex">
                  <FormButton type="button" onClick={addProject} variant="base">
                    <PlusIcon />
                  </FormButton>
                </div>
              </div>
              <div className="flex items-center gap-x-3 gap-y-3 flex-wrap">
                {project.map((x, i) => (
                  <div key={i} className="flex items-center justify-between gap-x-2 py-2 px-3 rounded-[8px] bg-base text-white">
                    <p className="w-full">{x.ProjeectName}</p>
                    <div className="w-fit">
                      <Link href={""} target="_blank">
                        <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                          />
                        </svg>
                      </Link>
                    </div>
                    <button type="button" onClick={() => removeProject(i)} className="z-10">
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
