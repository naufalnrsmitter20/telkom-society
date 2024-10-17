"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import logo from "@/../public/Telkom Society 1.png";
import Image from "next/image";
import { signOut } from "next-auth/react";
import DashboardIcon from "@/app/(admin)/admin/components/Icon/DashboardIcon";
import StudentDataIcon from "@/app/(admin)/admin/components/Icon/StudentDataIcon";
import TeamDataIcon from "@/app/(admin)/admin/components/Icon/TeamDataIcon";
import AchievementIcon from "@/app/(admin)/admin/components/Icon/AchievementIcon";

interface SideProps {
  title: string;
  href: string;
  icon: React.JSX.Element;
}

export default function Sidebar() {
  const SidebarItem: SideProps[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <DashboardIcon />,
    },
    {
      title: "Student Data",
      href: "/admin/studentData",
      icon: <StudentDataIcon />,
    },
    {
      title: "Team Data",
      href: "/admin/teamData",
      icon: <TeamDataIcon />,
    },
    {
      title: "Acievement Data",
      href: "/admin/achievementData",
      icon: <AchievementIcon />,
    },
  ];
  return (
    <>
      <div className="lg:block lg:w-80 relative">
        <aside id="sidebar" className={`fixed left-0 bg-white top-0 z-20 h-full flex-shrink-0 transition-all duration-300 lg:w-80 lg:opacity-100 hidden lg:flex`} aria-label="Sidebar">
          <div className="relative flex min-h-0 flex-1 flex-col border-r px-4 border-gray-200 bg-white pt-0 justify-between">
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
              <div className="flex-1 space-y-12 max-h-[60px] w-full bg-white px-3w">
                <Link href={"/"} className="flex items-center justify-center">
                  <Image src={logo} alt="Logo Telkom Society" className="pointer-events-none" />
                </Link>
                <ul className="space-y-4 pb-2">
                  {SidebarItem.map((x, i) => (
                    <li key={i}>
                      <Link href={x.href} className="group flex items-center gap-x-4 rounded-[50px] px-5 py-3 text-black/70 font-normal text-primary-400 hover:bg-secondary-color hover:text-[#F45846] transition-all">
                        <div>{x.icon}</div>
                        <p className="text-[18px] font-semibold">{x.title}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center mb-8">
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="group flex items-center rounded-[50px] px-5 py-3 text-base text-primary-400 hover:bg-secondary-color hover:text-red-600 font-semibold transition-all gap-x-3 w-full"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                    className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 12C7 12.5523 7.44772 13 8 13L16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11L8 11C7.44772 11 7 11.4477 7 12Z"
                    className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L9.41421 12L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
                    className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                  />
                </svg>
                <p>Log Out</p>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
