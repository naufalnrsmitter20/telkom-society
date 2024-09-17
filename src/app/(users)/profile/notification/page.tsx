import { FormButton, LinkButton } from "@/app/components/utils/Button";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import Accept from "./_components/Accept";
import Decline from "./_components/Decline";
import Reload from "./_components/Reload";
import Link from "next/link";

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
  const NotificationUser = await prisma.notification.findMany({
    where: { receiverId: session?.user?.id },
    include: { receiver: true },
    orderBy: {
      createAt: "desc",
    },
  });

  return (
    <div className="w-screen min-h-screen pt-40 justify-center pb-10">
      {NotificationUser.length !== 0 ? (
        currentNotif?.map((x, i) =>
          x.teamRequest.length !== 0 ? (
            <div key={i} className="w-5/6 h-3/5 mx-auto mt-4">
              {x.teamRequest.map((y, e) => (
                <>
                  {y.type === "INVITE" ? (
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
                        <p>
                          {y.sender.name} - {y.sender.job}
                        </p>
                        <p>
                          Owner of : <span className="font-medium text-highlight">{y.team.name}</span>
                        </p>
                      </div>
                      <div>
                        <Link href={`/division/profile/${y.teamId}`} className="text-[1rem] font-bold text-highlight border-2 border-moklet w-fit p-3 rounded-xl">
                          Invite You In {y.team?.name} as {y.receiver.job}
                        </Link>
                      </div>
                      {y.status === "PENDING" ? (
                        <div className="flex items-center">
                          <Accept teamId={y.teamId} reqId={y.id} />
                          <Decline teamId={y.teamId} reqId={y.id} />
                        </div>
                      ) : (
                        <>{y.status === "VERIFIED" ? <p className="text-[16px] text-green-400 font-medium m-6">You {y.status} this Team</p> : <p className="text-[16px] text-red-400 font-medium m-6">You {y.status} this Team</p>}</>
                      )}
                      {/* <div>
                        <FormButton variant="base" className="w-full text-center">
                          Back to Profile
                        </FormButton>
                      </div> */}
                    </div>
                  ) : (
                    <>
                      {y.type === "REQUEST" ? (
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
                            <h1 className="font-semibold text-lg ">Send to :</h1>
                            <p>
                              {y.sender.name} - {y.sender.job}
                            </p>
                            <p>
                              Owner of : <span className="font-medium text-highlight">{y.team.name}</span>
                            </p>
                          </div>
                          <div>
                            <Link href={`/division/profile/${y.teamId}`} className="text-[1rem] font-bold text-highlight border-2 border-moklet w-fit p-3 rounded-xl">
                              Request to Join {y.team?.name} as {y.receiver.job}
                            </Link>
                          </div>
                          {y.status === "PENDING" ? (
                            <p className="text-[16px] text-slate-400 font-medium m-6">{y.status}</p>
                          ) : (
                            <>{y.status === "VERIFIED" ? <p className="text-[16px] text-green-400 font-medium m-6">{y.status}</p> : <p className="text-[16px] text-red-400 font-medium m-6">{y.status}</p>}</>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          ) : (
            <div key={i} className="w-5/6 h-3/5 mx-auto mt-4">
              <div className="p-6 bg-white justify-between items-center flex drop-shadow-md rounded-[12px]">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">{x.title}</p>

                  {/* <p className="text-sm text-red-400 font-normal">{x.}</p> */}
                  <p className="text-[16px] text-slate-800 font-normal">
                    {x.createAt.toDateString()} at {x.createAt.getHours()}.{x.createAt.getMinutes().toLocaleString()}
                  </p>
                </div>
                {x.title.includes("You have been removed from") ? (
                  <p className="text-[16px] text-red-400 font-medium m-6">{x.message}</p>
                ) : x.title.includes("Invitation Canceled") ? (
                  <p className="text-[16px] text-red-400 font-medium m-6">{x.message}</p>
                ) : (
                  <p className="text-[16px] text-slate-400 font-medium m-6">{x.message}</p>
                )}
              </div>
            </div>
          )
        )
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
