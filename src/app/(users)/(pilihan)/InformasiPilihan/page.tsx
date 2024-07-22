import Image from "next/image";
import React from "react";

import Hustler from "@/../public/img/husler.png";
import Hipster from "@/../public/img/hipster.png";
import Hacker from "@/../public/img/hacker.png";

import { LinkButton } from "@/app/components/utils/Button";

export default function InformasiPilihan() {
  return (
    <div className="mt-[100px] p-10 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-[29px] font-medium text-[#F45846] mb-5">Mengenal Trio Keren di Balik Kesuksesan Startup: Hipster, Hacker, Husler!</h1>
        <p className="text-[18px] font-medium text-black opacity-70 -mt-2">Mengenal Hustler, Hipster, dan Hacker, tiga karakter penting bagi suksesnya sebuah perusahaab. Ketahui selengkapnya tentang Husler, Hipster dan Hacker disini</p>
      </div>
      <div className="mb-10">
        <h1 className="text-[25px] font-medium text-[#F45846] ">Hustler</h1>
        <div className="w-full max-w-full mb-3">
          <Image src={Hustler} alt="helo world" className="mx-auto" width={500} height={500} />
        </div>
        <p className="text-[20px] font-medium text-black opacity-70 -mt-2 text-justify">
          Hustler adalah penggerak bisnis yang fokus pada strategi, pemasaran, dan pertumbuhan perusahaan. Mereka mengembangkan strategi bisnis, mencari dan mengamankan pelanggan, serta menjalin hubungan dengan investor. Dengan keterampilan
          dalam penjualan, pemasaran, dan manajemen proyek, mereka memastikan produk dikenal di pasar dan menghasilkan pendapatan, serta menciptakan model bisnis yang berkelanjutan dan berkembang.
        </p>
      </div>
      <div className="mb-10">
        <h1 className="text-[25px] font-medium text-[#F45846] ">Hipster</h1>
        <div className="w-full max-w-full mb-5">
          <Image src={Hipster} alt="helo world" className="mx-auto" width={500} height={500} />
        </div>
        <p className="text-[20px] font-medium text-black opacity-70 -mt-2 text-justify">
          Hustler adalah penggerak bisnis yang fokus pada strategi, pemasaran, dan pertumbuhan perusahaan. Mereka mengembangkan strategi bisnis, mencari dan mengamankan pelanggan, serta menjalin hubungan dengan investor. Dengan keterampilan
          dalam penjualan, pemasaran, dan manajemen proyek, mereka memastikan produk dikenal di pasar dan menghasilkan pendapatan, serta menciptakan model bisnis yang berkelanjutan dan berkembang.
        </p>
      </div>
      <div className="mb-10">
        <h1 className="text-[25px] font-medium text-[#F45846] ">Hacker</h1>
        <div className="w-full max-w-full mb-5">
          <Image src={Hacker} alt="helo world" className="mx-auto" width={500} height={500} />
        </div>
        <p className="text-[20px] font-medium text-black opacity-70 text-justify mt-5">
          Hacker adalah teknisi yang mengembangkan dan memelihara produk. Mereka menulis kode, mengembangkan fitur baru, memecahkan bug, dan memastikan infrastruktur teknis berjalan dengan baik. Dengan keahlian dalam pemrograman,
          pengembangan web/app, dan sistem basis data, mereka memastikan produk berfungsi dengan optimal, aman, dan memiliki kinerja yang handal.
        </p>
      </div>
      <div className="w-full max-w-full mb-5">
        <h1 className="text-[25px] font-medium mx-auto">Sudah Paham? Jika sudah, silahkan kembali ke halaman pemilihan</h1>
        <div className="px-80">
          <LinkButton href="/pilihKeahlian" variant="base" className="w-full mt-8">
            <p className="mx-auto">Halaman Pemilihan</p>
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
