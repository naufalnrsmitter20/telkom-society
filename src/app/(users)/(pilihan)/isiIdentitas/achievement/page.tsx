"use client";
import PlusIcon from "@/app/components/Icons/PlusIcon";
import RedirectArrow from "@/app/components/Icons/RedirectArrow";
import XIcon from "@/app/components/Icons/XIcon";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { TextArea, TextField } from "@/app/components/utils/Form";
import { userFullPayload } from "@/utils/relationsip";
import { UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { Prisma, Project, Skill } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function Achievement() {
  const router = useRouter();
  const [userData, setUserData] = useState<userFullPayload | null>(null);
  const { data: session, status } = useSession();
  const [skills, setSkills] = useState([""]);
  const [project, setProject] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project>({ link: "", ProjeectName: "" });
  const [certificates, setCertificates] = useState<{ CertificateName: string; img: string; link: string }[]>([]);
  const [currentCertificate, setCurrentCertificate] = useState<{ CertificateName: string; img: string; link: string }>({ CertificateName: "", img: "", link: "" });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
            setCertificates(user?.certificates || [""]);
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

  const addCertificate = () => {
    const existingCertificate = certificates.find((c) => c.CertificateName.trim().toLowerCase() === currentCertificate.CertificateName.trim().toLowerCase());
    if (existingCertificate) {
      toast.error("Sertifikat Sudah Ada!");
      return;
    } else if (currentCertificate.CertificateName.trim() !== "" && currentCertificate.img.trim() !== "" && currentCertificate.link.trim() !== "") {
      setCertificates([...certificates, { ...currentCertificate }]);
      setCurrentCertificate({ CertificateName: "", img: "", link: "" });
      setImagePreviews([...imagePreviews, currentCertificate.img]);
    }
  };

  const removeCertificate = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append("Skills", JSON.stringify(skills));
      formData.append("projects", JSON.stringify(project));
      certificates.forEach((certificate, index) => {
        formData.append(`certificates[${index}].name`, certificate.CertificateName);
        formData.append(`certificates[${index}].img`, certificate.img);
        formData.append(`certificates[${index}].link`, certificate.link);
      });
      await UpdateUserById(formData);
      toast.success("Sukses Mengisi Data");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Gagal Mengisi Data");
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addProject();
    }
  };
  if (status === "unauthenticated") return router.push("/signin");
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
              <div className="mt-5 flex items-center gap-x-5 w-fit justify-center">
                <div className="w-full">
                  <TextField
                    value={currentCertificate.CertificateName}
                    handleChange={(e) => setCurrentCertificate({ ...currentCertificate, CertificateName: e.target.value })}
                    type="text"
                    label="Certificate (Can't Use, is error in server)"
                    placeholder="Certificate Name"
                    className="w-full"
                  />
                  <div className="mb-4">
                    <TextField
                      type="file"
                      handleChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imgURL = URL.createObjectURL(file);
                          setCurrentCertificate({ ...currentCertificate, img: imgURL });
                          setImagePreviews([...imagePreviews, imgURL]);
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  <TextField
                    value={currentCertificate.link}
                    handleChange={(e) => setCurrentCertificate({ ...currentCertificate, link: e.target.value })}
                    type="text"
                    label="Certificate Link (Optional)"
                    placeholder="Link to certificate"
                    className="w-full"
                  />
                </div>
                <div className="flex">
                  <FormButton type="button" onClick={addCertificate} variant="base">
                    <PlusIcon />
                  </FormButton>
                </div>
              </div>
              {/* {imagePreviews.map((preview, index) => (
                <div key={index} className="">
                  <Image src={preview} width={200} height={300} alt={`Current Certificate Preview ${index}`} className="rounded object-cover" />
                </div>
              ))} */}
              <div className="">
                {certificates.map((x, i) => (
                  <div key={i} className="flex gap-x-1">
                    <div className="flex-col items-center gap-x-2">
                      {x.img && <Image src={x.img} alt={x.CertificateName} width={300} height={200} className="rounded-[8px]" />}
                      <p>{x.CertificateName}</p>
                    </div>
                    <div>
                      <Link href={x.link} target="_blank">
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
                    <button type="button" onClick={() => removeCertificate(i)} className="z-10 w-full">
                      <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
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
