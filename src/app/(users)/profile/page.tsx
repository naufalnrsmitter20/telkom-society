"use client";
import React from "react";
import Banner from "@/../public/img/banner_profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
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
          <div className="h-4"></div>
          <h1 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal">{session?.user?.name} (Hacker)</h1>
          <div className="h-2"></div>
          <p className="text-gray-500 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl">X RPL 5</p>
          <p className="text-left text-gray-600 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Lobortis scelerisque fermentum dui
            faucibus in ornare.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-start mt-8">
          <h2 className="font-normal text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">Skill</h2>
          <div className="flex flex-wrap justify-start gap-x-4 gap-y-2 mb-8 mt-4">
            <span className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">Full-Stack Developer</span>
            <span className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">Data Analyst</span>
            <span className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl px-4 py-2 bg-red-500 text-white rounded-full">Graphic Designer</span>
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
              <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                NexaLab
              </a>
            </li>
            <li>
              <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                AgroSky
              </a>
            </li>
            <li>
              <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                AgroSky
              </a>
            </li>
            <li>
              <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                LansiCare
              </a>
            </li>
            <li>
              <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                TrashEase
              </a>
            </li>
            <li>
              <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                SmartAca
              </a>
            </li>
          </ul>
        </div>

        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">Partner List</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  Naufal Nabil Ramadhan - Hacker
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  Haza - Hacker
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  Fahrell - Hacker
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  Dviki - Hustler
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-4">Social Media</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  LinkedIn: username
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  GitHub: username
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  WhatsApp: number
                </a>
              </li>
              <li>
                <a href="#" className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl text-blue-500">
                  Instagram: username
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
