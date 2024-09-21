import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import ContentOfTeam from "./_components/ContentOfTeam";

export default async function Division() {
  const session = await nextGetServerSession();
  // const getTeam = await prisma.team.findMany({ where: { member: { some: { userId: session?.user?.id } } } });
  const getTeams = await prisma.team.findMany({ include: { _count: true, member: { include: { team: true, user: true } }, requests: true }, where: { NOT: { teamStatus: "DELETED" } } });
  const getOwner = getTeams.find((x) => x.ownerId);

  const Owner = await prisma.user.findFirst({ where: { id: getOwner?.ownerId }, include: { _count: true } });

  const currentUser = await prisma.user.findFirst({ where: { id: session?.user?.id } });

  return <ContentOfTeam currentUser={currentUser!} session={session!} teams={getTeams} Owner={Owner!} />;
}
