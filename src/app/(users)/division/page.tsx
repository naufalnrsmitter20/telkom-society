import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import ContentOfTeam from "./_components/ContentOfTeam";

export default async function Division() {
  const session = await nextGetServerSession();
  const getTeams = await prisma.team.findMany({
    include: { _count: true, member: { include: { team: true, user: { include: { Student: { include: { UserJob: true } } } } } }, requests: true, mentor: { include: { user: true } } },
    where: { NOT: { teamStatus: "DELETED" } },
  });
  const getOwner = getTeams.find((x) => x.ownerId);
  const Owner = await prisma.user.findFirst({ where: { id: getOwner?.ownerId }, include: { _count: true } });
  const currentUser = await prisma.user.findFirst({ where: { id: session?.user?.id } });
  const JobList = await prisma.userJob.findMany({ include: { user: true } });
  if (!session) return null;
  return <ContentOfTeam currentUser={currentUser!} session={session!} teams={getTeams} Owner={Owner!} jobList={JobList} />;
}
