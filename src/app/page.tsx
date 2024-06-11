import Image from "next/image";

import { LinkButton } from "./components/utils/Button";

import { Archivo_Black } from "next/font/google";
const archivo_black = Archivo_Black({ weight: "400", subsets: ["latin"] });

import Orangkeren from "@/../public/img/Element01.png";
import speed from "@/../public/ui/speed.png";
import thumb from "@/../public/ui/thumb_up.png";
import verify from "@/../public/ui/verified_user.png";
import festbg from "@/../public/ui/festive-background.png";
import Hijau from "@/../public/ui/Group_fill.png";
import Piala from "@/../public/ui/piala.png";
import Merah from "@/../public/ui/User_alt_fill.png";

const Festivebg = "bg-[url(" + festbg + ")]";

export default function Home() {
  return (
    <main className="mt-[200px]">
      <div className="justify-center flex items-center">
        <div>
          <h1 className={`text-[64px] text-start ${archivo_black.className}`}>
            TELKOM<span className="text-red-500">SOCIETY</span>
          </h1>
          <p className="text-[36px] font-[400]">
            Find the Best Competition
            <br /> Partner to Succeed Together!
          </p>
          <LinkButton
            href="#"
            className="mt-[17px] scale-125 ml-4"
            variant="base"
          >
            Join Us Now!
          </LinkButton>
        </div>
        <div>
          <Image src={Orangkeren} alt="Orang Sukses Amin" />
        </div>
      </div>
      <div className="mt-[175px]">
        <div className="flex justify-center text-center">
          <div>
            <h1 className="text-[36px] text-red-500 font-[600]">
              Why Telkom Society?
            </h1>
            <p className="text-[24px] text-black opacity-70">
              This is the reason why you should use Telkom Society to find your
              team
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="mt-[42px] flex gap-[190px] text-center">
            <div className="flex flex-col gap-4 items-center">
              <Image src={speed} alt="Fast" />
              <h1 className="text-red-500 text-[28px] font-medium">Fast</h1>
            </div>
            <div className="flex flex-col gap-4">
              <Image src={thumb} alt="Easy To Use" />
              <h1 className="text-red-500 text-[28px] font-medium">Easy</h1>
            </div>
            <div className="flex flex-col gap-4">
              <Image src={verify} alt="Safe" />
              <h1 className="text-red-500 text-[28px] font-medium text-center">
                Safe
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-full h-screen relative mt-[270px]">
        <Image
          src={festbg}
          alt="Background"
          className="w-full object-cover h-full absolute -z-10"
        />
        <div className="flex justify-center text-center w-full">
          <h1 className="text-[36px] text-white font-[600] mt-[120px]">
            Telkom Society is trusted and used by dozens of students in
            <br /> Telkom Malang Vocational School.
          </h1>
        </div>
        <div className="flex w-full items-end justify-center absolute bottom-0 max-w-full">
          <div className="mx-auto flex gap-x-[150px] text-[28px] text-center">
            <div className="bg-white flex justify-center pt-[30px] mt-24 rounded-t-xl flex-col text-center">
              <div className="w-[275px]"></div>
              <div className="flex flex-col justify-center items-center px-[10px] pb-[140px] ">
                <Image src={Piala} alt="Piala" />
                <h1>Jumlah Kompetisi</h1>
                <p className="opacity-70">Placeholder</p>
              </div>
            </div>
            <div className="bg-white flex justify-center pt-[30px] rounded-t-xl flex-col text-center">
              <div className="w-[275px]"></div>
              <div className="flex flex-col justify-center items-center px-[10px] pb-[140px]">
                <Image src={Merah} alt="Merah" />
                <h1>Jumlah User</h1>
                <p className="opacity-70 mb-24">Placeholder</p>
              </div>
            </div>
            <div className="bg-white flex justify-center pt-[30px] mt-12 rounded-t-xl flex-col text-center">
              <div className="w-[275px]"></div>
              <div className="flex flex-col justify-center items-center px-[10px] pb-[140px]">
                <Image src={Hijau} alt="Hijau" />
                <h1>Jumlah Tim</h1>
                <p className="opacity-70 mb-12">Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[215px] justify-center items-center flex">
        <div className="flex flex-col text-center items-center">
          <h1 className="text-[32px] font-[500]">
            Join the Telkom Society and find your dream
            <br /> team for you school competition!
          </h1>
          <LinkButton
            href="#"
            variant="base"
            className="scale-125 mb-[215px] mt-[20px]"
          >
            Join Us Now!
          </LinkButton>
        </div>
      </div>
    </main>
  );
}
