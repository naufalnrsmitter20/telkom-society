import { LinkButton } from "@/app/components/utils/Button";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ContentOfTeam from "./_components/ContentOfTeam";

export default async function Division() {
  const session = await nextGetServerSession();
  const getTeam = await prisma.team.findMany({ where: { member: { some: { userId: session?.user?.id } } } });
  return <ContentOfTeam />;
}
