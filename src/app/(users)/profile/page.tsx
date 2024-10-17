import React from "react";
import ContentProfile from "./_components/ProfileContent";
import { nextGetServerSession } from "@/lib/authOption";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function Profile() {
  const session = await nextGetServerSession();
  if (!session?.user?.email) {
    return redirect("signin");
  }
  const findUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      userAuth: true,
      invitation: true,
      Team: { include: { team: { include: { member: { include: { user: { include: { Student: { include: { UserJob: true } } } } } } } }, user: true } },
      teamRequest: true,
      Student: {
        include: { certificates: true, projects: true, Skills: true, ClassOfTalent: true, UserJob: true },
      },
    },
  });

  const JobData = await prisma.userJob.findMany();
  const ClassOfStudent = await prisma.classOfTalent.findMany();

  return (
    <>
      <ContentProfile userData={findUser!} session={session} jobData={JobData} classOfTalent={ClassOfStudent} />
    </>
  );
}
