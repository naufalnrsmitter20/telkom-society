"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Banner from "@/../public/img/banner_profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { userFullPayload } from "@/utils/relationsip";
import { Gender, Project, Religion, Skill } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RedirectArrow from "@/app/components/Icons/RedirectArrow";
import LinkedinIcon from "@/app/components/Icons/LinkedinIcon";
import GithubIcons from "@/app/components/Icons/GithubIcons";
import WhatsappIcons from "@/app/components/Icons/WhatsappIcons";
import InstagramIcons from "@/app/components/Icons/InstagramIcons";
import { FormButton, LinkButton } from "@/app/components/utils/Button";
import ModalProfile from "@/app/components/utils/Modal";
import { DropDown, TextArea, TextField } from "@/app/components/utils/Form";
import toast from "react-hot-toast";
import { UpdateGeneralProfileById, UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { occupation } from "@/types/occupation";
import EditSkill from "./EditSkill";
import EditProject from "./EditProject";
import { Session } from "next-auth";

export default function ContentProfile({ userData, session }: { userData: userFullPayload; session: Session }) {
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addSkillModal, setAddSkillModal] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);

  const router = useRouter();
  const [modal, setModal] = useState(false);
  console.log(userData?.projects);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOccupation(selectedValue);
  };

  const handleModal = () => {
    setModal(!modal);
  };
  const handleSkillModal = () => {
    setAddSkillModal(!addSkillModal);
  };
  const handleProjectModal = () => {
    setAddProjectModal(!addProjectModal);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      await UpdateGeneralProfileById(formData);
      toast.success("Sukses Mengisi Data");
      setIsLoading(false);
      router.push("/profile");
      window.location.reload();
    } catch (error) {
      console.log((error as Error).message);
      setIsLoading(false);

      toast.error("Gagal Mengedit Profil");
    }
  };
  const currentTeam = userData.Team.find((x) => x.userId === session.user?.id);
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
              {userData?.name} {`${userData?.job ? `(${userData?.job})` : "Loading..."}` as string}
            </h1>
            <div className="flex gap-x-2">
              <FormButton variant="base" onClick={handleModal}>
                Edit Profile
              </FormButton>
              <LinkButton href="/profile/notification" variant="base">
                Notification
              </LinkButton>
            </div>
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
                fillRule="evenodd"
                d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-left text-gray-800 text-lg sm:text-lg md:text-xl lg:text-xl">{userData.status}</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start mt-8">
          <h2 className="font-normal text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">Skill</h2>
          <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 mb-8 mt-4">
            {userData && userData?.Skills.length != 0 ? (
              <>
                {userData?.Skills.map((skill, i) => (
                  <div key={i} className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">
                    {skill.SkillName}
                  </div>
                ))}
                <button onClick={handleSkillModal} className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 hover:bg-base text-white rounded-full" type="button">
                  +
                </button>
              </>
            ) : (
              <>
                <button onClick={handleSkillModal} className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 hover:bg-base text-white rounded-full" type="button">
                  +
                </button>{" "}
              </>
            )}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-start my-8 mt-8">
          <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">My Project</h2>
          <ul className="space-y-2">
            {userData && userData?.projects.length !== 0 ? (
              <div className="flex gap-x-3">
                {userData?.projects.map((x, i) => (
                  <div key={i}>
                    <div className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-6 py-2 bg-red-500 text-white rounded-full flex  items-center gap-x-3">
                      <p className="font-medium text-lg">{x.ProjeectName}</p>
                      <Link href={x.link as string} target="_blank">
                        <svg className="w-6 h-6 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
                  </div>
                ))}
                <button onClick={handleProjectModal} className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 hover:bg-base text-white rounded-full" type="button">
                  +
                </button>
              </div>
            ) : (
              <button onClick={handleProjectModal} className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 hover:bg-base text-white rounded-full" type="button">
                +
              </button>
            )}
          </ul>
        </div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">Partner List</h2>
            <p className="font-semibold text-xl mb-4">
              Team Name :{" "}
              {currentTeam?.team ? (
                <span className="className='text-[#F45846]'">{currentTeam?.team.name}</span>
              ) : (
                <span className="text-slate-500 font-medium">
                  <i>Dont Have Team</i>
                </span>
              )}
            </p>
            <ul className="space-y-2">
              {currentTeam ? (
                currentTeam.team.member.map((x, i) => (
                  <li key={i}>
                    <Link href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-slate-800">
                      {i + 1}. {x.user.name} - {x.user.job}
                    </Link>
                  </li>
                ))
              ) : (
                <></>
              )}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formdata = new FormData(e.currentTarget);

              handleSubmit(formdata);
            }}
          >
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
              <TextField type="text" label="school Origin" name="schoolOrigin" disabled readOnly defaultValue={userData?.schoolOrigin as string} />

              <DropDown
                label="Gender"
                defaultValue={userData?.gender as string}
                options={Object.values(Gender).map((x) => ({
                  label: x,
                  value: x,
                }))}
                name="gender"
              />
              <DropDown
                name="religion"
                label="Religion"
                defaultValue={userData?.religion as string}
                options={Object.values(Religion).map((x) => ({
                  label: x,
                  value: x,
                }))}
              />
              <DropDown
                name="job"
                handleChange={handleSelectChange}
                label="Job"
                value={selectedOccupation || userData?.job}
                options={occupation.map((e) => ({
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
      )}
      {addSkillModal && <EditSkill session={session} userData={userData} onClose={() => setAddSkillModal(false)} />}
      {addProjectModal && <EditProject session={session} userData={userData} onClose={() => setAddProjectModal(false)} />}
    </div>
  );
}
