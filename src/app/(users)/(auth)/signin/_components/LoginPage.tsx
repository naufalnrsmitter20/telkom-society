"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import imageSigIn from "@/../public/img/sigin image.png";
import Logo from "@/../public/img/logo telkom society big.png";
import google from "@/../public/svg/google.svg";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { userFullPayload } from "@/utils/relationsip";
import toast from "react-hot-toast";
import { Session } from "next-auth";

export default function LoginPage({ userData, session }: { userData: userFullPayload; session: Session }) {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session && userData) {
      setIsLoading(true);
      if (userData.Student?.UserJob?.jobName.length === undefined) {
        toast.success("Berhasil Login!");
        if (userData.role === "SISWA") {
          router.push("/pilihKeahlian");
        } else if (userData.role === "GUEST") {
          router.push("/");
        } else {
          router.push("/admin");
        }
        setIsLoading(false);
      } else if (userData.Student?.UserJob?.jobName) {
        toast.success("Berhasil Login!");
        if (userData.role === "SISWA") {
          router.push("/profile");
        } else {
          router.push("/admin");
        }
        setIsLoading(false);
      } else {
        toast.error("Maaf Login Gagal");
        setIsLoading(false);
      }
    }
  }, [session, userData, router]);

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn("google");
  };

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
              {loading ? (
                <button className="focus:outline-none text-white bg-base flex justify-center items-center hover:bg-red-600 focus:ring focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 mt-6 w-full">
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
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  type="button"
                  className="focus:outline-none text-white bg-base flex justify-center items-center hover:bg-red-600 focus:ring focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 mt-6 w-full"
                >
                  <Image src={google} alt="Google" width={20} height={20} className="mr-2" />
                  <p className="font-medium ">Continue with Google</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
