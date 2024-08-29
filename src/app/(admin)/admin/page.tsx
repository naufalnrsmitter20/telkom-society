import React from "react";
import AdminHeaders from "./components/main/AdminHeaders";

interface cardProps {
  title: string;
  data: string;
  desc: string;
}

export default function AdminPage() {
  const CardItem: cardProps[] = [
    {
      title: "Number of student",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
    {
      title: "Number of Team",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
    {
      title: "Number of Mentor",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
    {
      title: "Number of Achievement",
      data: "1200",
      desc: "Malang Telkom Vocational School students",
    },
  ];
  return (
    <>
      <section className="w-full">
        <AdminHeaders data="Dashboard" />
        <section className="max-w-[1440px] mx-auto w-full bg-[#F6F6F6] p-4">
          <h5 className="text-[24px] font-semibold text-[#F45846]">Statistik Data</h5>
          <div className="grid grid-cols-4 p-4 gap-x-4">
            {CardItem.map((x, i) => (
              <div key={i} className="p-6 bg-white drop-shadow rounded-[12px]">
                <p className="text-[16px] font-normal">{x.title}</p>
                <div className="mt-6">
                  <h6 className="text-[40px] font-medium text-[#F45846]">{x.data}</h6>
                  <p className="text-[14px] font-normal">{x.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
