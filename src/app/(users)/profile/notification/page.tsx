import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import Accept from "./_components/Accept";
import Decline from "./_components/Decline";
import Reload from "./_components/Reload";

export default async function Notification() {
  const session = await nextGetServerSession();
  const inviteNotif = await prisma.teamRequest.findMany({
    where: { receiverId: session?.user?.id, type: "INVITE" },
    include: { sender: true, team: true, receiver: true },
  });
  const requestNotif = await prisma.teamRequest.findMany({
    where: { receiverId: session?.user?.id, type: "REQUEST" },
    include: { sender: true, team: true, receiver: true },
  });
  const currentNotif = await prisma.notification.findMany({
    where: { receiverId: session?.user?.id },
    include: { teamRequest: { include: { receiver: true, Notification: true, sender: true, team: true } }, receiver: true },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <div className="w-screen min-h-screen pt-40 justify-center">
      {currentNotif?.length !== 0 ? (
        currentNotif?.map((x, i) => (
          <div key={i} className="w-5/6 h-3/5 mx-auto mt-4">
            {x.teamRequest.map((y, e) => (
              <div key={e} className="p-6 bg-white justify-between items-center flex drop-shadow-md rounded-[12px]">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">{y.Notification?.title}</p>
                  {y.status === "PENDING" && <p className="text-sm text-slate-600 font-normal">{y.Notification?.message}</p>}
                  {y.status === "VERIFIED" && <p className="text-sm text-green-400 font-normal">{y.Notification?.message}</p>}
                  {y.status === "DENIED" && <p className="text-sm text-red-400 font-normal">{y.Notification?.message}</p>}
                  <p className="text-[16px] text-slate-800 font-normal">
                    {y.Notification?.createAt.toDateString()} at {y.Notification?.createAt.getHours()}.{y.Notification?.createAt.getMinutes().toLocaleString()}
                  </p>
                </div>
                <div>
                  <h1 className="font-semibold text-lg ">Sender :</h1>
                  <p>{y.sender.name}</p>
                  <p>Job : {y.sender.job}</p>
                </div>
                <div>
                  <h1 className="text-[1rem] font-bold text-highlight border-2 border-moklet w-fit p-3 rounded-xl">
                    Invite You In {y.team?.name} as {y.receiver.job}
                  </h1>
                </div>
                {y.status === "PENDING" ? (
                  <div className="flex items-center">
                    <Accept teamId={y.teamId} reqId={y.id} />
                    <Decline teamId={y.teamId} reqId={y.id} />
                  </div>
                ) : (
                  <>{y.status === "VERIFIED" ? <p className="text-[16px] text-green-400 font-medium m-6">You {y.status} this Team</p> : <p className="text-[16px] text-red-400 font-medium m-6">You {y.status} this Team</p>}</>
                )}
              </div>
            ))}
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
                  {x.status === "VERIFIED" ? <p className="text-[16px] text-green-400 font-medium m-6">{x.status}</p> : <p className="text-[16px] text-red-400 font-medium m-6">{x.status}</p>}{" "}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col w-full">
              <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl text-black mt-56 text-center">Oops! Tidak ada notifikasi apa pun disini</h1>
                <div className="px-52 mt-2 flex gap-4">
                  <Reload />
                  <LinkButton variant="base" href="/profile" className="w-full text-center">
                    Back to Profile
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
