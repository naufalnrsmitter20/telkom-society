"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import setting from "@/../public/svg/settingsP.png";
import { LinkButton } from "@/app/components/utils/Button";
import JoinTeam from "./JoinTeam";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";

export default function ContentOfTeam({
  teams,
  Owner,
  session,
  currentUser,
  jobList,
}: {
  teams: Prisma.TeamGetPayload<{ include: { _count: true; member: { include: { team: true; user: { include: { Student: { include: { UserJob: true } } } } } }; requests: true; mentor: { include: { user: true } } } }>[];
  Owner: Prisma.UserGetPayload<{ include: { _count: true } }>;
  session: Session;
  currentUser: Prisma.UserGetPayload<{}>;
  jobList: Prisma.UserJobGetPayload<{ include: { user: true } }>[];
}) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selected, setSelected] = useState("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  const [filteredUser, setFilteredUser] =
    useState<Prisma.TeamGetPayload<{ include: { _count: true; member: { include: { team: true; user: { include: { Student: { include: { UserJob: true } } } } } }; requests: true; mentor: { include: { user: true } } } }>[]>(teams);

  useEffect(() => {
    const filterUsers = () => {
      const filteredByName = teams.filter((team: Prisma.TeamGetPayload<{ include: { _count: true; member: { include: { team: true; user: true } }; requests: true } }>) => team.name.toLowerCase().includes(searchInput.toLowerCase()));
      const finalFilteredUsers = selected === "All" ? filteredByName : filteredByName.filter((teams: Prisma.TeamGetPayload<{}>) => teams.ownerId === selected);
      setFilteredUser(finalFilteredUsers);
    };
    filterUsers();
  }, [searchInput, selected, teams]);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleButtonFilter = (data: string) => {
    setSelected(data);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeams = filteredUser.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const availableJobs = jobList.map((job) => job.jobName);

  return (
    <>
      <section className="max-w-full min-h-screen mx-auto xl:mx-48 pt-32 md:flex mb-56 gap-x-4 px-4 xl:px-0">
        <div className="block md:hidden mb-4">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ml-1 ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-full border-gray-100  bg-white focus:ring-red-100 focus:ring-2 outline-none focus:border-base"
              placeholder="Search Name or Job"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <button type="submit" className="absolute end-0 bottom-0 focus:outline-none text-white bg-base hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium  text-sm px-5 py-2.5 me-2 mb-2 flex w-fit items-center rounded-full">
              Search
            </button>
          </div>
        </div>
        {/* responsive */}

        <div className="lg:w-5/12">
          <div className="grid grid-cols-1 gap-4">
            <div className="w-full bg-white rounded-3xl pb-6">
              <Image src={(currentUser?.cover as string) || ""} unoptimized quality={100} width={100} height={100} alt="banner" className="w-full rounded-t-3xl h-36 object-cover object-top" />
              <div className="rounded-full overflow-hidden -mt-8 relative w-[60px] h-[60px] ml-4">
                <Image src={(session?.user?.image as string) || ""} height={60} width={60} alt="image" className="absolute" />
              </div>
              <div className="ml-20 -mt-3">
                <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-black">{session?.user?.name}</p>
                <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-slate-600">{session?.user?.role}</p>
              </div>
            </div>
            <div className="w-full px-10 bg-white rounded-3xl py-4">
              <div className="py-4 font-Quicksand xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-light text-slate-500">Manage Your Team</div>
              <hr />
              <div className="grid grid-cols-1">
                <button onClick={() => handleButtonFilter("All")} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
                  <Image src={setting} width={30} alt="hustler" />
                  <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">All Team</p>
                </button>
                <button onClick={() => handleButtonFilter(session?.user?.id as string)} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
                  <Image src={setting} width={30} alt="hustler" />
                  <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Your Team</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="md:block hidden">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ml-1 ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-full border-gray-100  bg-white focus:ring-red-100 focus:ring-2 outline-none focus:border-base"
                placeholder="Search Name or Job"
                value={searchInput}
                onChange={handleSearchInput}
              />
              <button type="submit" className="absolute end-0 bottom-0 focus:outline-none text-white bg-base hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium  text-sm px-5 py-2.5 me-2 mb-2 flex w-fit items-center rounded-full">
                Search
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <LinkButton href="/division/create" variant="base" className="mt-4 mb-6">
              Create Team
            </LinkButton>
            <div className="font-semibold text-lg">
              Total Result : <span>{filteredUser.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 bg-white rounded-xl gap-y-4 w-full">
            <>
              {currentTeams.map((x, i) => (
                <div key={i} className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 ">
                  <Image unoptimized quality={100} className="object-cover w-full rounded-lg h-96 md:h-auto md:w-48 m-5" width={200} height={100} src={x.logo as string} alt={x.name} />
                  <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className=" text-2xl font-bold tracking-tight text-black">{x.name}</h5>
                    <h5 className="mb-2 text-sm font-medium tracking-tight text-black">
                      Create by <span className="font-semibold">{x.ownerId === session?.user?.id ? "You" : x.member.find((y) => y.role === "OWNER")?.user.name}</span>
                    </h5>
                    <h5 className="mb-2 text-[1rem] font-semibold tracking-tight text-green-400">
                      Available Job : <span className="font-semibold text-black">{availableJobs.filter((job) => !x.member.some((member) => member.user.Student?.UserJob?.jobName === job)).join(" & ")}</span>
                    </h5>
                    <h5 className="text-xl font-semibold tracking-tight text-black">Jumlah Anggota : {x._count.member}</h5>
                    <h5 className="mb-2 text-lg font-semibold tracking-tight text-black">Mentor : {x.mentor?.user.name}</h5>
                    <p className="text-lg font-medium text-black ">Description</p>
                    <p className="mb-3 font-normal text-slate-600 overflow-x-hidden">{x.description}</p>
                    <div className="flex justify-end gap-x-3">
                      {x.ownerId === session.user?.id || (x.member.find((y) => y.memberId === session.user?.id) ? <></> : <JoinTeam teamId={x.id} />)}
                      <LinkButton href={`/division/profile/${x.id}`} variant="base">
                        Details
                      </LinkButton>
                    </div>
                    <hr />
                  </div>
                </div>
              ))}
            </>
            {filteredUser.length > itemsPerPage && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button key={index} className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-red-500 text-white" : "bg-gray-200"}`} onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
