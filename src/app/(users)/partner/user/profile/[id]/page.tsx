import React from "react";
import DetailProfilePartner from "./_components/DetailProfilePartner";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function profilePartner({ params }: { params: { id: string } }) {
  const session = await nextGetServerSession();
  if (!session?.user?.email) {
    return redirect("signin");
  }
  const findUser = await prisma.user.findFirst({
    where: { id: params.id },
    include: {
      Student: { include: { Skills: true, projects: true, UserJob: true, ClassOfTalent: true } },
      Team: { include: { team: { include: { member: { include: { user: { include: { Team: true, Student: { include: { UserJob: true } } } } } } } }, user: true } },
      invitation: true,
      notification: true,
    },
  });
  return <DetailProfilePartner userId={params.id} userData={findUser!} />;
}
