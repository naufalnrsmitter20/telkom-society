"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Banner from "@/../public/img/banner_profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { userFullPayload } from "@/utils/relationsip";
import { Gender, Religion, Skill } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RedirectArrow from "@/app/components/Icons/RedirectArrow";
import LinkedinIcon from "@/app/components/Icons/LinkedinIcon";
import GithubIcons from "@/app/components/Icons/GithubIcons";
import WhatsappIcons from "@/app/components/Icons/WhatsappIcons";
import InstagramIcons from "@/app/components/Icons/InstagramIcons";
import { FormButton } from "@/app/components/utils/Button";
import ModalProfile from "@/app/components/utils/Modal";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import toast from "react-hot-toast";
import { UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { revalidatePath } from "next/cache";
import { occupation } from "@/types/occupation";

export default function Profile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<userFullPayload | null>(null);
  const [skills, setSkills] = useState([""]);
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);

  const router = useRouter();
  const [modal, setModal] = useState(false);

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOccupation(selectedValue);
  };
  const handleModal = () => {
    setModal(!modal);
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append("skills", JSON.stringify(skills));
      await UpdateUserById(formData);
      toast.success("Sukses Mengisi Data");
      setModal(false);
      router.push("/profile");
      window.location.reload();
    } catch (error) {
      console.log((error as Error).message);
      toast.error("Gagal Mengedit Profil");
    }
  };
  if (status === "unauthenticated") return router.push("/signin");
  if (status === "loading") return "Loading...";
  return (
    <div className="bg-slate-100 p-0 sm:p-5 md:p-10 lg:p-15 xl:p-20">
      <div className="mt-24 bg-white rounded-3xl p-10 sm:p-10 md:p-15 lg:p-20 xl:p-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 h-72">
          <Image src={Banner} alt="banner profile" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col items-start mt-44 sm:mt-48 md:mt-44 lg:mt-32 xl:mt-28">
          <div className="w-32 h-32 sm:w-24 md:w-32 flex place-items-center lg:w-36 xl:w-40 sm:h-24 md:h-32 lg:h-36 xl:h-40 rounded-full bg-gray-300 mb-4 overflow-hidden">
            <Image src={session?.user?.image as string} alt="Image Profile" width={180} height={180} className="mx-auto" />
          </div>
          <div className="mt-4 flex w-full justify-between">
            <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal">
              {userData?.name} {`(${userData?.job})` as string}
            </h1>
            <FormButton variant="base" onClick={handleModal}>
              Edit Profile
            </FormButton>
          </div>
          <div className="h-2"></div>
          <p className="text-gray-500 text-lg sm:text-lg md:text-xl lg:text-xl">{userData?.clasess}</p>
          <p className="text-left text-gray-600 text-lg sm:text-lg md:text-xl lg:text-xl mt-4 mb-8">{userData?.biography}</p>
          <div className="flex items-center gap-x-4 mb-2">
            <svg className="w-6 h-6 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
              />
            </svg>
            <p className="text-left text-gray-800 text-lg sm:text-lg md:text-xl lg:text-xl">{userData?.job}</p>
          </div>
          <div className="flex items-center gap-x-4">
            <svg className="w-6 h-6 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                fill-rule="evenodd"
                d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                clip-rule="evenodd"
              />
            </svg>
            <p className="text-left text-gray-800 text-lg sm:text-lg md:text-xl lg:text-xl">udefined</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start mt-8">
          <h2 className="font-normal text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">Skill</h2>
          <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 mb-8 mt-4">
            {userData?.Skills.map((skill, i) => (
              <div key={i} className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">
                {skill.SkillName}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start mt-8">
          <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">Certificate</h2>
          <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 mb-8 mt-4">
            <span className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">Telkom DigiUp: Data Science</span>
            <span className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">ITS: ExploIT Event</span>
            <span className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">UHT: Bussines Plan</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start my-8 mt-8">
          <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">My Project</h2>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800 flex items-center gap-x-3">
                <p>NexaLab</p>
                <svg className="w-6 h-6 text-slate-800 hover:text-[#F45846]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">Partner List</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">
                  Naufal Nabil Ramadhan - Hacker
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">
                  Haza - Hacker
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">
                  Fahrell - Hacker
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">
                  Dviki - Hustler
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">Social Media</h2>
            <ul className="space-y-6">
              <li className="flex items-center gap-x-3">
                <LinkedinIcon />
                <p className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">{userData?.linkedin}</p>
                <Link href={`https://linkedin.com/in/${userData?.linkedin}`} target="_blank">
                  <RedirectArrow />
                </Link>
              </li>
              <li className="flex items-center gap-x-3">
                <GithubIcons />
                <p className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">{userData?.github}</p>
                <Link href={`https://github.com/${userData?.github}`} target="_blank">
                  <RedirectArrow />
                </Link>
              </li>
              <li className="flex items-center gap-x-3">
                <WhatsappIcons />
                <p className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">wa.me/{userData?.whatsapp}</p>
                <Link href={`https://wa.me/${userData?.whatsapp}`} target="_blank">
                  <RedirectArrow />
                </Link>
              </li>
              <li className="flex items-center gap-x-3">
                <InstagramIcons />
                <p className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">@{userData?.instagram}</p>
                <Link href={`https://www.instagram.com/${userData?.instagram}`} target="_blank">
                  <RedirectArrow />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {modal && (
        <ModalProfile onClose={() => setModal(false)}>
          <form onSubmit={handleSubmit}>
            <TextField type="text" label="Name" readOnly disabled defaultValue={userData?.name as string} />
            <TextField type="text" label="Email" readOnly disabled defaultValue={userData?.email as string} />
            <TextArea label="Biography" name="biography" defaultValue={userData?.biography as string} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
              <TextField type="text" label="Class" name="clasess" defaultValue={userData?.clasess as string} />
              <TextField type="text" label="Absent" name="absent" defaultValue={userData?.absent as string} />
              <TextField type="text" label="Phone" name="Phone" defaultValue={userData?.Phone as string} />
              <TextField type="date" label="Birth Date" name="BirthDate" defaultValue={userData?.BirthDate as string} />
              <TextField type="text" label="NIS" name="NIS" defaultValue={userData?.NIS as string} />
              <TextField type="text" label="NISN" name="NISN" defaultValue={userData?.NISN as string} />
              <TextField type="text" label="school Origin" name="schoolOrigin" defaultValue={userData?.schoolOrigin as string} />

              <DropDown
                name="gender"
                handleChange={handleSelectChange}
                label="Gender"
                defaultValue={userData?.gender as Gender}
                options={Object.values(Gender).map((x) => ({
                  label: x,
                  value: x,
                }))}
              />
              <DropDown
                name="religion"
                handleChange={handleSelectChange}
                label="Religion"
                defaultValue={userData?.religion as Religion}
                options={Object.values(Religion).map((x) => ({
                  label: x,
                  value: x,
                }))}
              />
              <DropDown
                name="job"
                handleChange={handleSelectChange}
                label="Occupation"
                defaultValue={userData?.job}
                options={occupation.map((e, i) => ({
                  label: e.occupation,
                  value: e.value,
                }))}
              />
            </div>
            <div>
              <div className="flex gap-x-3 items-center">
                <WhatsappIcons />
                <TextField type="text" label="Whatsapp" name="whatsapp" className="w-full" defaultValue={userData?.whatsapp as string} />
              </div>
              <div className="flex gap-x-3 items-center">
                <InstagramIcons />
                <TextField type="text" label="Instagram" name="instagram" className="w-full" defaultValue={userData?.instagram as string} />
              </div>
              <div className="flex gap-x-3 items-center">
                <LinkedinIcon />
                <TextField type="text" label="Linkedin" name="linkedin" className="w-full" defaultValue={userData?.linkedin as string} />
              </div>
              <div className="flex gap-x-3 items-center">
                <GithubIcons />
                <TextField type="text" label="Github" name="github" className="w-full" defaultValue={userData?.github as string} />
              </div>
            </div>
            <div className="flex justify-end w-full gap-x-4 pb-4">
              <FormButton onClick={() => setModal(false)} variant="white">
                Close
              </FormButton>
              <FormButton type="submit" variant="base">
                Edit
              </FormButton>
            </div>
          </form>
        </ModalProfile>
      )}
    </div>
  );
}
