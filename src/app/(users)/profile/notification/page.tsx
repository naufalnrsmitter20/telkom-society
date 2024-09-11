import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import Accept from "./_components/Accept";
import Decline from "./_components/Decline";

export default async function Notification() {
  const session = await nextGetServerSession();
  const inviteNotif = await prisma.teamRequest.findMany({
    where: { receiverId: session?.user?.id, status: "PENDING", type: "INVITE" },
    include: { sender: true, team: true, receiver: true },
  });
  const requestNotif = await prisma.teamRequest.findMany({
    where: { receiverId: session?.user?.id, status: "PENDING", type: "REQUEST" },
    include: { sender: true, team: true, receiver: true },
  });
  return (
    <div className="w-screen min-h-screen pt-40 justify-center">
      {inviteNotif.length !== 0 ? (
        inviteNotif.map((x, i) => (
          <div key={i} className="w-5/6 h-3/5 mx-auto mt-4">
            <div className="p-6 bg-white justify-between items-center flex drop-shadow rounded-[12px]">
              <div className="flex">
                <p className="text-[16px] font-normal m-6">{x.sender.name}</p>
                <h6 className="text-[16px] font-medium m-6 text-[#F45846]">{x.sender.clasess}</h6>
                <p className="text-[16px] font-normal m-6">{x.sender.job}</p>
              </div>
              <div>
                <h1 className="text-lg font-bold text-highlight border-2 border-moklet w-fit p-3 rounded-xl">Invite You In {x.team?.name}</h1>
              </div>
              <div className="flex items-center">
                <Accept teamId={x.teamId} reqId={x.id} />
                <Decline teamId={x.teamId} reqId={x.id} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {requestNotif.length !== 0 ? (
            requestNotif.map((x, i) => (
              <div key={i} className="w-5/6 h-3/5 mx-auto mt-4">
                <div className="p-6 bg-white justify-between items-center flex drop-shadow rounded-[12px]">
                  <div className="flex">
                    <p className="text-[16px] font-normal m-6">{x.sender.name}</p>
                    <h6 className="text-[16px] font-medium m-6 text-[#F45846]">{x.sender.clasess}</h6>
                    <p className="text-[16px] font-normal m-6">{x.sender.job}</p>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-highlight border-2 border-moklet w-fit p-3 rounded-xl">Request Join to {x.team?.name}</h1>
                  </div>
                  {/* <div className="flex items-center">
                    <Accept teamId={x.teamId} reqId={x.id} />
                    <Decline teamId={x.teamId} reqId={x.id} />
                  </div> */}
                  <p className="text-[16px] font-normal m-6">{x.status}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col w-full">
              <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl text-black mt-56 text-center">Oops! Tidak ada notifikasi apa pun disini</h1>
                <div className="px-52 mt-2">
                  <LinkButton variant="base" href="/profile" className="w-full text-center">
                    Kembali ke Halaman Profil
                  </LinkButton>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
