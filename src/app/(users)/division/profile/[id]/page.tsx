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
  const teamMember = await prisma.teamMember.findMany({ where: { teamId: profile?.id }, include: { user: true, team: true } });
  const teamRequest = await prisma.teamRequest.findMany({ where: { teamId: profile?.id }, include: { sender: true, receiver: true } });
  const findMember = profile?.member.find((x) => x.userId);
  const findRequestMember = teamRequest?.find((x) => x.receiverId);
  const user = await prisma.user.findMany({
    include: { Team: true, invitation: true, teamRequest: true },
    where: { NOT: [{ id: session?.user?.id }, { job: findCurrentUser?.job }, { Team: { userId: findMember?.userId } }, { teamRequest: { every: { receiverId: findRequestMember?.receiverId } } }] },
  });
  return (
    <main className="mt-20 lg:mt-32 mb-20 min-h-screen">
      <div className="max-w-7xl w-full mx-auto bg-white shadow-md lg:rounded-[20px] overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-10">
            <Image src={profile?.logo as string} width={192} height={192} alt="logo" className="h-48 w-full object-cover md:w-48" />
          </div>
          <div className="p-8">
            <General profile={profile} teamId={params.id} userId={session?.user?.id as string} />
            <MemberTable teamMember={teamMember} data={user} teamRequest={teamRequest} />
            <div className="mt-8 flex space-x-4">
              <Link target="_blank" href={`https://www.linkedin.com/${profile?.linkedin}`} className="text-blue-500 hover:underline">
                LinkedIn
              </Link>
              <Link target="_blank" href={`https://www.instagram.com/${profile?.instagram}`} className="text-blue-500 hover:underline">
                Instagram
              </Link>
              <Link target="_blank" href="https://www.github.com" className="text-blue-500 hover:underline">
                Github
              </Link>
              <Link target="_blank" href="https://www.youtube.com" className="text-blue-500 hover:underline">
                Youtube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
