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
  const profile = await prisma.team.findFirst({ where: { id: params.id }, include: { member: true, requests: true, mentor: { include: { user: true } } } });
  const teamMember = await prisma.teamMember.findMany({ where: { teamId: profile?.id, NOT: { role: "OWNER" } }, include: { user: { include: { Student: { include: { UserJob: true } } } }, team: true } });
  const teamOwner = await prisma.teamMember.findFirst({ where: { teamId: profile?.id, NOT: { role: "MEMBER" } }, include: { user: { include: { Student: { include: { UserJob: true } } } }, team: true } });
  const teamRequest = await prisma.teamRequest.findMany({ where: { teamId: profile?.id }, include: { sender: { include: { Student: { include: { UserJob: true } } } }, receiver: { include: { Student: { include: { UserJob: true } } } } } });
  const mentor = await prisma.teacher.findMany({
    include: { user: true },
  });
  const findMember = profile?.member.find((x) => x.memberId);
  const findRequestMember = teamRequest?.find((x) => x.receiverId);

  const user = await prisma.user.findMany({
    include: { Team: true, invitation: true, teamRequest: true, Student: { include: { UserJob: true } } },
    where: {
      NOT: [
        { id: session?.user?.id },
        { Team: { some: { memberId: findMember?.memberId } } },
        { role: "ADMIN" },
        { role: "GURU" },
        { Student: { UserJob: { jobName: undefined } } },
        { OR: [{ id: findRequestMember?.receiver.id, teamRequest: { some: { status: "PENDING" } } }, { Student: { status: "Have_Team" } }] },
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
            <General profile={profile!} teamId={params.id} userId={session?.user?.id as string} mentor={mentor} />
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
