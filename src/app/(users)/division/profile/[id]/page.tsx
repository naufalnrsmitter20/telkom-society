import prisma from "@/lib/prisma";
import Link from "next/link";
import { nextGetServerSession } from "@/lib/authOption";
import Image from "next/image";
import General from "../_components/General";
import MemberTable from "../_components/MemberTable";

export default async function Division({ params }: { params: { id: string } }) {
  if (!params.id) {
    return <div className="mt-56">Team Not Found</div>;
  }
  const session = await nextGetServerSession();
  const findCurrentUser = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  });
  const profile = await prisma.team.findFirst({ where: { id: params.id }, include: { member: true, requests: true } });
  const teamMember = await prisma.teamMember.findMany({ where: { teamId: profile?.id, NOT: { role: "OWNER" } }, include: { user: true, team: true } });
  const teamOwner = await prisma.teamMember.findFirst({ where: { teamId: profile?.id, NOT: { role: "MEMBER" } }, include: { user: true, team: true } });
  const teamRequest = await prisma.teamRequest.findMany({ where: { teamId: profile?.id }, include: { sender: true, receiver: true } });
  const findMember = profile?.member.find((x) => x.userId);
  const findRequestMember = teamRequest?.find((x) => x.receiverId);

  const user = await prisma.user.findMany({
    include: { Team: true, invitation: true, teamRequest: true },
    where: {
      NOT: [
        { id: session?.user?.id },
        { Team: { some: { userId: findMember?.userId } } },
        { role: "ADMIN" },
        { role: "GURU" },
        { job: "Undefined" },
        { OR: [{ id: findRequestMember?.receiver.id, teamRequest: { some: { status: "PENDING" } } }, { status: "Have_Team" }] },
      ],
    },
  });
  if (!profile?.id) {
    return (
      <div className="min-h-screen w-full">
        <h1 className="text-center font-semibold text-4xl mt-80">Team Not Found</h1>
      </div>
    );
  }
  return (
    <main className="mt-20 lg:mt-32 mb-20 min-h-screen max-w-full">
      <div className="max-w-7xl w-full mx-auto bg-white shadow-md outline outline-1 outline-slate-200 lg:rounded-[20px] overflow-hidden">
        <div className="md:flex w-full mx-auto">
          <div className="p-10">
            <Image unoptimized quality={100} src={profile?.logo as string} width={192} height={192} alt="logo" className="h-auto w-full object-cover md:w-48" />
          </div>
          <div className="p-8 w-full">
            <General profile={profile!} teamId={params.id} userId={session?.user?.id as string} />
            <MemberTable teamOwner={teamOwner!} teamMember={teamMember} data={user} teamRequest={teamRequest} session={session!} />
            <div className="mt-8 flex space-x-4">
              <Link target="_blank" href={`https://www.linkedin.com/${profile?.linkedin}`} className="text-blue-500 hover:underline">
                LinkedIn
              </Link>
              <Link target="_blank" href={`https://www.instagram.com/${profile?.instagram}`} className="text-blue-500 hover:underline">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
