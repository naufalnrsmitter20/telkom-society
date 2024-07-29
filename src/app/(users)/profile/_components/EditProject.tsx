"use client";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import XIcon from "@/app/components/Icons/XIcon";
import { FormButton } from "@/app/components/utils/Button";
import { TextField } from "@/app/components/utils/Form";
import ModalProfile from "@/app/components/utils/Modal";
import { userFullPayload } from "@/utils/relationsip";
import { UpdateUserProjectById } from "@/utils/server-action/userGetServerSession";
import { Project } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditProject({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [userData, setUserData] = useState<userFullPayload | null>(null);
  const { data: session, status } = useSession();
  const [project, setProject] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>({ link: "", ProjeectName: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        try {
          const response = await fetch(`/api/user?userId=${session.user?.id}`);
          if (response.ok) {
            const { user } = await response.json();
            setUserData(user);
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

  const addProject = () => {
    const exixtingProject = project?.find((p) => p.ProjeectName.trim().toLowerCase() === currentProject.ProjeectName?.trim().toLowerCase());
    if (exixtingProject) {
      toast.error("Project Sudah Ada!");
      return;
    } else if (currentProject.ProjeectName?.trim() !== "" && currentProject.link?.trim() !== "") {
      setProject([...project, { ...currentProject }]);
      setCurrentProject({ ProjeectName: "", link: "" });
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
      formData.append("projects", JSON.stringify(project));
      await UpdateUserProjectById(formData);
      toast.success("Sukses Mengisi Data");
      setIsLoading(false);
      window.location.reload();
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
    <ModalProfile onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-x-6">
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
            <TextField onKeyDown={handleKeyDown} value={currentProject.link as string} handleChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })} type="text" placeholder="Link to project" className="w-full" />
          </div>
          <div className="flex">
            <FormButton type="button" onClick={addProject} variant="base">
              <PlusIcon />
            </FormButton>
          </div>
        </div>
        <div className="flex items-center gap-x-3 gap-y-3 flex-wrap">
          {project.map((x, i) => (
            <div key={i} className="flex items-center gap-x-2 py-2 px-3 rounded-[8px] bg-base text-white">
              <p>{x.ProjeectName}</p>
              <div>
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
              <button type="button" onClick={() => removeProject(i)} className="z-10 w-full">
                <XIcon />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end w-full gap-x-4 pb-4 mt-12">
          <FormButton onClick={onClose} variant="white">
            Close
          </FormButton>
          <FormButton type="submit" variant="base">
            {!isLoading ? (
              "Edit"
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
      </form>
    </ModalProfile>
  );
}
