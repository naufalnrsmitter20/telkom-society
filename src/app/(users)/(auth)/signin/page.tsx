"use client";
import Image from "next/image";
import React from "react";
import imageSigIn from "@/../public/img/sigin image.png";
import Logo from "@/../public/img/logo telkom society big.png";
import { FormButton } from "@/app/components/utils/Button";
import google from "@/../public/svg/google.svg";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  return (
    <React.Fragment>
      <main className="min-h-screen-minus-10">
        <div className="flex max-w-full w-full h-screen items-center justify-center relative">
          <div className="w-1/2 hidden lg:inline-block relative">
            <Image src={imageSigIn} alt="gambar login" className="object-cover max-h-screen w-full -z-10" />
          </div>
          <div className="lg:w-1/2 w-full h-screen pt-24 px-4 lg:px-0">
            <Image width={370} src={Logo} alt="Logo" className="mx-auto mt-6" />
            <div className="max-w-lg mx-auto mt-2">
              <h3 className="text-[35.4px] font-medium text-black leading-none">Welcome to Telkom Society!</h3>
              <p className="text-[20px] font-medium text-black opacity-70 lg:-mt-2">Find and build your team here</p>
              <form name="FormData" className="mt-4 ">
                <div className="mt-3">
                  <label htmlFor="email" className="block mb-2 text-sm font-normal text-black dark:text-white">
                    Email address
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-slate-50 border border-slate-900 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-400 block w-full p-2.5 outline-none placeholder:text-slate-700 tracking-wide placeholder:font-extralight"
                    placeholder="Email Sekolah"
                    required
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="password" className="block mb-2 text-sm font-normal text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-slate-50 border border-slate-900 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-400 block w-full p-2.5 outline-none placeholder:text-slate-700 tracking-wide placeholder:font-extralight"
                    placeholder="Password Email Sekolah"
                    required
                  />
                </div>
                <FormButton type="button" onClick={() => router.push("/pilihKeahlian")} variant="base" className="w-full mt-6">
                  Masuk
                </FormButton>
              </form>
              <div className="flex justify-center items-center mt-4">
                <div className="h-0.5 w-1/3 bg-slate-400"></div>
                <p className="xl:text-[16px] lg:text-[15px] w-1/3 md:text-[14px] sm:text-[13px] text-[12px] text-center text-slate-400 font-light mx-2">Or continue with</p>
                <div className="h-0.5 w-1/3 bg-slate-400"></div>
              </div>
              <FormButton type="button" variant="white" className="flex w-full justify-center mt-6 gap-x-2">
                <Image src={google} alt="Google" width={20} height={20} className="mr-2" />
                <p className="font-normal text-slate-600">Continue with Google</p>
              </FormButton>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
