import React from "react";
import banner from "@/../public/img/banner ryo.png";
import Image from "next/image";
import gambarRyo from "@/../public/img/gambar ryo.png";
import hipster from "@/../public/svg/hipsterP.png";
import hustler from "@/../public/svg/hustlerP.svg";
import hacker from "@/../public/svg/hackerP.png";
import setting from "@/../public/svg/settingsP.png";
import Link from "next/link";
import { LinkButton } from "@/app/components/utils/Button";

export default function partner() {
  return (
    <main className="min-h-screen-minus-10 bg-slate-100 pt-36">
      <section className="max-w-7xl mx-auto md:flex gap-x-4 px-4 xl:px-0">
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
        <div className="lg:w-2/5 grid grid-cols-1 gap-4">
          <div className="w-full bg-white rounded-3xl pb-6">
            <Image src={banner} alt="banner" className="w-full" />
            <div className="rounded-full overflow-hidden -mt-8 relative w-[60px] h-[60px] ml-4">
              <Image src={gambarRyo} width={60} alt="image" className="absolute" />
            </div>
            <div className="ml-20 -mt-3">
              <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-black">Ryo Hariyono Angwyn</p>
              <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-slate-600">UI/UX Designer</p>
            </div>
          </div>
          <div className="w-full px-10 bg-white rounded-3xl py-4">
            <div className="py-4 font-Quicksand xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-light text-slate-500">Manage your partner</div>
            <hr />
            <div className="grid grid-cols-1">
              <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
                <Image src={hustler} width={30} alt="hustler" />
                <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Hustler</p>
              </Link>
              <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
                <Image src={hipster} width={30} alt="hustler" />
                <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Hipster</p>
              </Link>
              <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
                <Image src={hacker} width={30} alt="hustler" />
                <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Hacker</p>
              </Link>
              <Link href={"#"} className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2">
                <Image src={setting} width={30} alt="hustler" />
                <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">Setting</p>
              </Link>
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
            <div id="container" className="w-full bg-slate-50 rounded-3xl pb-6 border border-slate-200">
              <Image src={banner} alt="banner" className="w-full" />
              <div className="rounded-full overflow-hidden -mt-12 relative w-[60px] h-[60px] ml-4">
                <Image src={gambarRyo} width={60} alt="image" className="absolute" />
              </div>
              <div className="ml-12 mt-2">
                <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-[16px] text-black">Ryo Hariyono Angwyn</p>
                <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-slate-600">Hipster | UI/UX Designer</p>
                <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-green-400 mt-2">Status: Have Team</p>
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
            <div id="container" className="w-full bg-slate-50 rounded-3xl pb-6 border border-slate-200">
              <Image src={banner} alt="banner" className="w-full" />
              <div className="rounded-full overflow-hidden -mt-12 relative w-[60px] h-[60px] ml-4">
                <Image src={gambarRyo} width={60} alt="image" className="absolute" />
              </div>
              <div className="ml-12 mt-2">
                <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-[16px] text-black">Ryo Hariyono Angwyn</p>
                <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-slate-600">Hipster | UI/UX Designer</p>
                <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-green-400 mt-2">Status: Have Team</p>
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
          </div>
        </div>
      </section>
    </main>
  );
}
