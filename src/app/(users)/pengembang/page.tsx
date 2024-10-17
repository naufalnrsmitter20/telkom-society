import React from "react";

export default function Pengembang() {
  const developers = [
    { job: "General Manager", name: "Muhammad Chusni Agus, M.Pd., Gr." },
    { job: "Project Manager & Fullstack Developer", name: "Naufal Nabil Ramadhan" },
    { job: "Backennd Developer", name: "people" },
    { job: "Frontend Developer 1", name: "Haza Nasrullah Kuswantoro" },
    { job: "Frontend Developer 2", name: "Aaron Zanett Samudra" },
    { job: "UI/UX Designer 1", name: "Ryo Hariyono Angwyn" },
    { job: "UI/UX Designer 2", name: "people" },
    { job: "Machine Learning Engineer", name: "Shofi Yulloh Kamil" },
  ];

  return (
    <div className="flex flex-col min-h-screen-minus-10">
      <div className="flex-grow mt-[100px] p-10 max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-[29px] font-medium text-[#F45846] mb-5">Developer Credit</h1>
          <div className="grid grid-cols-2 gap-y-2 gap-x-16 max-w-3xl items-end">
            {developers.map((developer, index) => (
              <React.Fragment key={index}>
                <p className="xl:text-[18px] lg:text-[17px] md:text-[16px] sm:text-[15px] text-[14px] font-semibold text-black opacity-70">{developer.job}</p>
                <p className="xl:text-[18px] lg:text-[17px] md:text-[16px] sm:text-[15px] text-[14px] font-medium text-black opacity-70">{developer.name}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
