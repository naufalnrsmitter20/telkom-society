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

export default function PilihKeahlian() {
  const { data: session, status } = useSession();
  const [selectedOccupation, setSelectedOccupation] = useState<string | null>(null);
  const router = useRouter();

  if (status === "unauthenticated") router.push("/signin");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOccupation(selectedValue);
  };

  const handleSubmit = async () => {
    if (!selectedOccupation) {
      alert("Please select an occupation");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("job", selectedOccupation);
      await UpdateUserById(formData);
      router.push("/isiIdentitas");
    } catch (error) {
      console.error("Failed to update user job:", error);
      alert("Failed to update user job");
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
              <FormButton type="button" variant="base" onClick={handleSubmit} className="mt-6 w-full">
                Continue
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
