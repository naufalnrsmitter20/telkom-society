import React from "react";
import programmer from "@/../public/img/1.png";
import hustler from "@/../public/img/2.png";
import hipster from "@/../public/img/3.png";
import Image from "next/image";
import { FormButton } from "@/app/components/utils/Button";
import Link from "next/link";

interface occupationProops {
  occupation: string;
  value: string;
}

export default function PilihKeahlian() {
  const occupation: occupationProops[] = [
    { occupation: "Hipster (Product Innovation & Design)", value: "Hipster (Product Innovation & Design)" },
    { occupation: "Hacker (Software and Technology)", value: "Hacker (Software and Technology)" },
    { occupation: "Hustler (Product Presenter and Finance)", value: "Hustler (Product Presenter and Finance)" },
  ];

  return (
    <React.Fragment>
      <main className="flex max-w-full w-full h-screen items-center justify-center">
        <div className={"w-7/12 grid grid-cols-3 gap-x-6"}>
          <Image src={hustler} alt="Gambar Pilihan" className="w-full h-screen object-cover" />
          <Image src={programmer} alt="Gambar Pilihan" className="w-full h-screen object-cover" />
          <Image src={hipster} alt="Gambar Pilihan" className="w-full h-screen object-cover" />
        </div>
        <div className="w-5/12 h-full pt-24">
          <div className="max-w-2xl mx-auto mt-12">
            <h3 className="text-[32px] font-medium text-black">What are You?</h3>
            <p className="text-[20px] font-medium text-black opacity-70 -mt-2">Decide what you want to be</p>
            <form className="mt-10">
              <select
                id="occupation"
                className="bg-slate-50 border border-slate-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-slate-400 block w-full p-2.5 outline-none placeholder:text-slate-300 placeholder:font-extralight"
              >
                <option selected>Select Occupation</option>
                {occupation.map((e, i) => (
                  <option key={i} value={e.value}>
                    {e.occupation}
                  </option>
                ))}
              </select>
              <FormButton variant="base" className="mt-6 w-full">
                Continue
              </FormButton>
              <p className="text-[14px] text-slate-500 font-light text-center mt-6">
                Still confuse with the choice, click here for the{" "}
                <Link href={"/InformasiPilihan"} className="text-base">
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
