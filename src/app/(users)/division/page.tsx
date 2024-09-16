import { LinkButton } from "@/app/components/utils/Button";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ContentOfTeam from "./_components/ContentOfTeam";

export default async function Division() {
  const session = await nextGetServerSession();
  // const getTeam = await prisma.team.findMany({ where: { member: { some: { userId: session?.user?.id } } } });
  const getTeams = await prisma.team.findMany({ include: { _count: true, member: { include: { team: true, user: true } }, requests: true } });
  const getOwner = getTeams.find((x) => x.ownerId);

  const Owner = await prisma.user.findFirst({ where: { id: getOwner?.ownerId }, include: { _count: true } });

  return <ContentOfTeam session={session!} teams={getTeams} Owner={Owner!} />;
}
