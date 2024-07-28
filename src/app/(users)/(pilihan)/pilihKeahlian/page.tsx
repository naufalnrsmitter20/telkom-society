"use client";
import React, { useEffect, useState } from "react";
import programmer from "@/../public/img/3.png";
import hustler from "@/../public/img/2.png";
import hipster from "@/../public/img/1.png";
import Image from "next/image";
import { FormButton } from "@/app/components/utils/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateUserById } from "@/utils/server-action/userGetServerSession";
import { Job, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { occupation } from "@/types/occupation";
import toast from "react-hot-toast";

export default function PilihKeahlian() {
  const { data: session, status } = useSession();
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (status === "unauthenticated") router.push("/signin");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOccupation(selectedValue);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!selectedOccupation) {
      setIsLoading(false);
      toast.error("Please select an occupation");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("job", selectedOccupation);
      await UpdateUserById(formData);
      setIsLoading(false);
      toast.success("Berhasil Memilih Keahllian");
      router.push("/isiIdentitas");
    } catch (error) {
      console.error("Failed to update user job:", error);
      toast.error("Gagal Memilih Keahllian");
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <main className="flex max-w-full w-full h-screen items-center justify-center">
        {!selectedOccupation && (
          <div className={"w-1/2 grid grid-cols-3 gap-x-6"}>
            <Image src={programmer} alt="Programmer" className="w-full h-screen object-cover" />
            <Image src={hipster} alt="Hipster" className="w-full h-screen object-cover" />
            <Image src={hustler} alt="Hustler" className="w-full h-screen object-cover" />
          </div>
        )}
        {selectedOccupation === "Hipster" && (
          <div className="w-1/2 grid grid-cols-1 gap-x-6">
            <Image src={hipster} alt="Hipster" className="w-full h-screen object-cover" />
          </div>
        )}
        {selectedOccupation === "Hacker" && (
          <div className="w-1/2 grid grid-cols-1 gap-x-6">
            <Image src={programmer} alt="Programmer" className="w-full h-screen object-cover" />
          </div>
        )}
        {selectedOccupation === "Hustler" && (
          <div className="w-1/2 grid grid-cols-1 gap-x-6">
            <Image src={hustler} alt="Hustler" className="w-full h-screen object-cover" />
          </div>
        )}

        <div className="w-1/2 h-full pt-24">
          <div className="max-w-2xl mx-auto mt-12">
            <h3 className="text-[32px] font-medium text-black">What are You?</h3>
            <p className="text-[20px] font-medium text-black opacity-70 -mt-2">Decide what you want to be</p>
            <form className="mt-10">
              <select
                title="occupation"
                id="occupation"
                name="job"
                className="bg-slate-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-400 block w-full p-2.5 outline-none placeholder:text-slate-300 placeholder:font-light placeholder:tracking-wide"
                onChange={handleSelectChange}
              >
                <option>Select Occupation</option>
                {occupation.map((e, i) => (
                  <option key={i} value={e.value}>
                    {e.occupation}
                  </option>
                ))}
              </select>
              <FormButton disabled={isLoading} type="button" variant="base" onClick={handleSubmit} className="mt-6 w-full">
                {!isLoading ? (
                  "Continue"
                ) : (
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
                )}
              </FormButton>
              <p className="text-[14px] text-slate-500 font-normal text-center mt-6">
                Still confuse with the choice, click here for the{" "}
                <Link href={"/InformasiPilihan"} className="text-base font-semibold">
                  information
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
