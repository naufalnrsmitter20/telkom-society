import React from "react";
import banner from "@/../public/img/banner ryo.png";
import Image from "next/image";

import { LinkButton } from "@/app/components/utils/Button";
import Asides from "./Aside";
import { findAllUsers } from "@/utils/user.query";

export default async function Main() {
  const getUser = await findAllUsers();

  return (
    <section className="max-w-full mx-auto xl:mx-48 md:flex gap-x-4 px-4 xl:px-0">
      {/* responsive */}
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
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-full border-gray-100  bg-white focus:ring-red-100 focus:ring-2 outline-none focus:border-base"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button type="submit" className="absolute end-0 bottom-0 focus:outline-none text-white bg-base hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium  text-sm px-5 py-2.5 me-2 mb-2 flex w-fit items-center rounded-full">
            Search
          </button>
        </div>
      </div>
      {/* responsive */}

      <Asides />
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
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-full border-gray-100  bg-white focus:ring-red-100 focus:ring-2 outline-none focus:border-base"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button type="submit" className="absolute end-0 bottom-0 focus:outline-none text-white bg-base hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium  text-sm px-5 py-2.5 me-2 mb-2 flex w-fit items-center rounded-full">
              Search
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 bg-white rounded-xl p-8 mt-4">
          {getUser.map((user, i) => (
            <div key={i} id="container" className="w-full bg-slate-50 rounded-3xl pb-6 border border-slate-200">
              <Image src={banner} alt="banner" className="w-full" />
              <div className="rounded-full overflow-hidden -mt-12 relative w-[60px] h-[60px] ml-4">
                <Image src={user.photo_profile as string} height={60} width={60} alt="image" className="absolute" />
              </div>
              <div className="ml-12 mt-2">
                <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-[16px] text-black">{user.name}</p>
                <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-slate-600">{user.job} | </p>
                <p className={`font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] mt-2 ${user?.status === "Dont_Have_Team" ? "text-red-500" : user?.status === "Have_Team" ? "text-green-500" : ""}`}>
                  Status: {user?.status}
                </p>
                <div className="mt-6 justify-start">
                  <LinkButton variant="white" href="#" className="bg-transparent border rounded-full">
                    Profil
                  </LinkButton>
                  <LinkButton variant="white" href="#" className="bg-transparent border rounded-full">
                    Chat
                  </LinkButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
