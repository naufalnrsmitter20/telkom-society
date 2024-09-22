"use client";
import Link from "next/link";
import Image from "next/image";
import { FormButton, LinkButton } from "./Button";

import Logo from "@/../public/Telkom Society 1.png";
import portalku from "@/../public/img/portalku.png";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Bell from "../Icons/Bell";

export default function Navbar() {
  const [modal, setModal] = useState<boolean>(false);
  const [prof, setprof] = useState<boolean>(false);

  const handleProf = () => {
    prof ? setprof(false) : setprof(true);
    setModal(false);
  };
  const handleClick = () => {
    setModal(!modal);
    setprof(false);
  };

  const redirectPage = () => {
    setModal(false);
    setprof(false);
  };

  const pathName = usePathname();
  const router = useRouter();

  const { data: session, status } = useSession();
  return (
    <main>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="w-screen flex flex-wrap items-center justify-between mx-auto p-4 lg:px-20">
          <Link href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={Logo} alt="Telkom Society" />
          </Link>

          <div className="flex md:order-2 space-x-3 items-center justify-end md:space-x-0">
            <div>
              {status === "unauthenticated" ? (
                <button onClick={() => signIn()} className="focus:outline-none text-black bg-white hover:bg-slate-100 focus:ring focus:ring-slate-100 font-medium rounded-full border border-slate-300 text-sm px-5 py-2.5 me-2 mb-2">
                  Sign In
                </button>
              ) : (
                <>
                  {status === "loading" ? (
                    <></>
                  ) : (
                    <div className="">
                      <div className="flex lg:gap-x-6 justify-end">
                        <LinkButton variant="white" href="/profile/notification" className="group hidden sm:block">
                          <Bell />
                        </LinkButton>
                        <FormButton type="button" variant="base" onClick={handleProf} withArrow className="md:flex hidden justify-center gap-x-2 py-2 px-4">
                          <Image src={session?.user?.image as string} alt="user image" width={36} height={36} className="rounded-full" />
                        </FormButton>
                        <button type="button" onClick={handleProf} className="mt-2 mr-3 flex md:hidden ">
                          <Image src={session?.user?.image as string} alt="user image" width={36} height={36} className="rounded-full" />
                        </button>
                      </div>
                      {prof && (
                        <div className="w-full p-2 max-w-56 bg-white mt-1 border border-slate-300 rounded-lg fixed right-12 top-24 inline-block">
                          <LinkButton variant="base" href="/profile" className="w-full">
                            <p className="mx-auto text-sm">Profile</p>
                          </LinkButton>
                          <FormButton onClick={() => signOut({ callbackUrl: "/signin" })} variant="base" className="w-full">
                            <p className="mx-auto text-sm">Sign Out</p>
                          </FormButton>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex p-2 w-10 h-10 mb-2 lg:mb-0 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
              onClick={handleClick}
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>

            <div>
              {modal && (
                <div className="flex mt-10 text-center lg:hidden">
                  <ul className="fixed left-0 mt-4 w-screen border-y bg-white border-slate-300 bg-primary-1000 py-14 space-y-14">
                    <li>
                      <Link onClick={redirectPage} href="/" className={`${pathName === "/" ? "text-red-400" : "text-black"} rounded md:bg-transparent hover:text-red-600`}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link onClick={redirectPage} href="/partner" className={`${pathName === "/partner" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600`}>
                        Partner
                      </Link>
                    </li>
                    <li>
                      <Link onClick={redirectPage} href="/messages" className={`${pathName === "/messages" ? "text-red-400" : "text-black"}text-black rounded md:hover:bg-transparent hover:text-red-600`}>
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link onClick={redirectPage} href="/division" className={`${pathName === "/division" ? "text-red-400" : "text-black"}text-black rounded md:hover:bg-transparent hover:text-red-600`}>
                        Division
                      </Link>
                    </li>
                    <li>
                      <Link onClick={redirectPage} href="/pengembang" className={`${pathName === "/pengembang" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600`}>
                        Developers
                      </Link>
                    </li>
                    {session && session?.user?.role !== "SISWA" && (
                      <li>
                        <Link onClick={redirectPage} href="/admin" className={`${pathName === "/admin" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600`}>
                          Admin
                        </Link>
                      </li>
                    )}
                    <li className="flex justify-center">
                      <Link onClick={redirectPage} href="https://portalku.benspace.xyz/">
                        <Image src={portalku} width={78} alt="Portalku" />
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 opacity-80">
              <li>
                <Link onClick={redirectPage} href="/" className={`${pathName === "/" ? "text-red-400" : "text-black"} rounded md:bg-transparent hover:text-red-600 duration-500`}>
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={redirectPage} href="/partner" className={`${pathName === "/partner" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600 duration-500`}>
                  Partner
                </Link>
              </li>
              <li>
                <Link onClick={redirectPage} href="/messages" className={`${pathName === "/messages" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600 duration-500`}>
                  Messages
                </Link>
              </li>
              <li>
                <Link onClick={redirectPage} href="/division" className={`${pathName === "/division" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600 duration-500`}>
                  Division
                </Link>
              </li>
              <li>
                <Link onClick={redirectPage} href="/pengembang" className={`${pathName === "/pengembang" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600 duration-500`}>
                  Developers
                </Link>
              </li>
              {session && session?.user?.role !== "SISWA" && (
                <li>
                  <Link onClick={redirectPage} href="/admin" className={`${pathName === "/admin" ? "text-red-400" : "text-black"} rounded md:hover:bg-transparent hover:text-red-600`}>
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <Link target="_blank" onClick={redirectPage} href="https://portalku.benspace.xyz/">
                  <Image src={portalku} width={78} alt="Portalku" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </main>
  );
}
