"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import banner from "@/../public/img/banner ryo.png";
import Image from "next/image";
import hipster from "@/../public/svg/hipsterP.png";
import hustler from "@/../public/svg/hustlerP.svg";
import hacker from "@/../public/svg/hackerP.png";
import setting from "@/../public/svg/settingsP.png";
import { userWithLastLogin } from "@/utils/relationsip";
import { getData } from "@/lib/FetchData";
import { useSession } from "next-auth/react";
import { fetcher } from "@/utils/server-action/Fetcher";
import useSWR from "swr";
import Popup from "./_components/Popup";
import Link from "next/link";

export default function Main() {
  const { data: session } = useSession();
  const [searchInput, setSearchInput] = useState<string>("");
  const [selected, setSelected] = useState("All");
  const [triger, setTriger]=useState(false)
  const { data: response, error } = useSWR("/api/data", fetcher, {
    refreshInterval: 1000,
  });

  const userData = response?.dataUser || [];
  console.log(userData);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleDetail=()=>{
    setTriger(true)
  }
  const handleButtonFilter = (data: string) => {
    setSelected(data);
  };

  if (error) return <div>Data Tidak Ditemukan</div>;
  if (!response) return <div>Loading...</div>;

  return (
    <>
    {/* responsive */}
    <Popup triggers={triger} setTriggers={setTriger}>
      <div className="flex w-full h-fit justify-center">
        <Link href="">
        
        </Link>
      </div>
      </Popup>
    <section className="max-w-full mx-auto xl:mx-48 pt-32 md:flex mb-56 gap-x-4 px-4 xl:px-0">
      <div className="block md:hidden mb-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ml-1 ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-full border-gray-100  bg-white focus:ring-red-100 focus:ring-2 outline-none focus:border-base"
            placeholder="Search Name or Job"
            value={searchInput}
            onChange={handleSearchInput}
            required
          />
          <button
            type="submit"
            className="absolute end-0 bottom-0 focus:outline-none text-white bg-base hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium  text-sm px-5 py-2.5 me-2 mb-2 flex w-fit items-center rounded-full"
          >
            Search
          </button>
        </div>
      </div>
      {/* responsive */}

      <div className="lg:w-5/12">
        <div className="grid grid-cols-1 gap-4">
          <div className="w-full bg-white rounded-3xl pb-6">
            <Image src={banner} alt="banner" className="w-full" />
            <div className="rounded-full overflow-hidden -mt-8 relative w-[60px] h-[60px] ml-4">
              <Image
                src={session?.user?.image as string}
                height={60}
                width={60}
                alt="image"
                className="absolute"
              />
            </div>
            <div className="ml-20 -mt-3">
              <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-black">
                {session?.user?.name}
              </p>
              <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-slate-600">
                {session?.user?.role}
              </p>
            </div>
          </div>
          <div className="w-full px-10 bg-white rounded-3xl py-4">
            <div className="py-4 font-Quicksand xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-light text-slate-500">
              Manage Your Team
            </div>
            <hr />
            <div className="grid grid-cols-1">
              <button
                onClick={() => handleButtonFilter("All")}
                className="flex gap-x-4 items-center py-2 hover:bg-slate-100 focus:ring-2 focus:ring-slate-500 rounded-xl mt-2 pl-2"
              >
                <Image src={setting} width={30} alt="hustler" />
                <p className="xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] font-medium font-Quicksand text-slate-500">
                  Your Team
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="md:block hidden">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ml-1 ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-full border-gray-100  bg-white focus:ring-red-100 focus:ring-2 outline-none focus:border-base"
              placeholder="Search Name or Job"
              value={searchInput}
              onChange={handleSearchInput}
              required
            />
            <button
              type="submit"
              className="absolute end-0 bottom-0 focus:outline-none text-white bg-base hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-medium  text-sm px-5 py-2.5 me-2 mb-2 flex w-fit items-center rounded-full"
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 bg-white rounded-xl p-8 mt-4">
          <>
            {userData.map(
              (
                i: React.Key | null | undefined,
                user: {
                  photo_profile: string;
                  name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                  job:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                  status:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.PromiseLikeOfReactNode
                    | null
                    | undefined;
                }
              ) => (
                <div
                  key={i}
                  id="container"
                  className="w-full bg-slate-50 relative rounded-3xl pb-6 border justify-center flex flex-col border-slate-200"
                >
                  <Image src={banner} alt="banner" className="w-full" />
                  <div className="bg-gradient-to-b from-white to-black w-full h-40 absolute z-20 mix-blend-multiply top-0 flex ">
                    <div className="w-full flex justify-center">
                    <h1 className="text-center text-highlight relative mt-2 tracking-[4px] font-bold text-lg">Nama Team : {user.name}</h1>
                    </div>
                    <div className="rounded-full overflow-hidden absolute bottom-2 -mt-12 w-[60px] h-[60px] ml-4">
                      <Image
                        src="https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png "
                        height={60}
                        width={60}
                        alt="image"
                        className="absolute bottom-0 bg-white z-50"
                      />
                    </div>
                    <p className="text-white absolute right-0 bottom-3 z-50 font-extralight w-[75%] text-xs">
                      Lorem ipsum dolor sit amet consectetur laudantium earum ea
                      delectus nulla, eos ad unde laboriosam corrupti velit
                      dignissimos nostrum hic repudiandae sit. Neque!
                    </p>
                  </div>
                  <div className="ml-12 mt-2">
                    <p className="font-medium xl:text-[20px] lg:text-[19px] md:text-[18px] sm:text-[17px] text-[16px] text-black">
                      {user.name}
                    </p>
                    <p className="font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] text-slate-600">
                      {user.job} |{" "}
                    </p>
                    <p
                      className={`font-normal xl:text-[15px] lg:text-[14px] md:text-[13px] sm:text-[12px] text-[11px] mt-2 ${
                        user?.status === "Dont_Have_Team"
                          ? "text-red-500"
                          : user?.status === "Have_Team"
                          ? "text-green-500"
                          : ""
                      }`}
                    >
                      Jumlah Anggota: {user?.status}
                    </p>
                    <div className="mt-6 justify-start">
                      <button
                        className="bg-transparent border p-4 rounded-full"
                      >
                        Join
                      </button>
                      <button
                        onClick={handleDetail}
                        className="bg-transparent border p-4 rounded-full"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
        </div>
      </div>
    </section>
    </>
  );
}
