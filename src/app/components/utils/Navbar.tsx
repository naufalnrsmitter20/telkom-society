"use client";
import Link from "next/link";
import Image from "next/image";
import LinkButton from "./Button";

import Logo from "@/../public/Telkom Society 1.png";
import { useState } from "react";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(!modal);
  };
  return (
    <main>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={Logo} alt="Telkom Society" />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <LinkButton href="#" variant="base">
              Get Started
            </LinkButton>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={handleClick}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div>
              {modal && (
                <div className="flex mt-10 text-center">
                  <ul className="fixed left-0 mt-4 w-screen border-y bg-white border-slate-300 bg-primary-1000 py-2">
                    <li>
                      <Link href="#" className="text-red-400 rounded md:bg-transparent hover:text-red-600" aria-current="page">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-black rounded md:hover:bg-transparent hover:text-red-600">
                        Partner
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-black rounded md:hover:bg-transparent hover:text-red-600">
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="text-black rounded md:hover:bg-transparent hover:text-red-600">
                        Developers
                      </Link>
                    </li>
                  </ul>
                  <div></div>
                </div>
              )}
            </div>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 opacity-80">
              <li>
                <Link href="#" className="text-red-400 rounded md:bg-transparent hover:text-red-600" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-red-600">
                  Partner
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-red-600">
                  Messages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-black rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-red-600">
                  Developers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </main>
  );
}
