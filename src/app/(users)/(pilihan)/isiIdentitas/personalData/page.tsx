import React from "react";
import PersonalData from "./_components/Data1";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DataUser1() {
  const session = await nextGetServerSession();
  const data = await prisma.user.findUnique({ where: { id: session?.user?.id }, include: { Student: { include: { Skills: true, projects: true, ClassOfTalent: true, UserJob: true } } } });
  const ClassOfStudent = await prisma.classOfTalent.findMany();
  if (!session?.user) redirect("/signin");
  return <PersonalData session={session!} userData={data!} classOfTalent={ClassOfStudent} />;
}
