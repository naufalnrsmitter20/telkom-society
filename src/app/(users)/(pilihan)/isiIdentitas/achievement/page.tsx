import React from "react";
import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Achievement from "./_components/Data2";

export default async function DataUser1() {
  const session = await nextGetServerSession();
  const data = await prisma.user.findUnique({ where: { id: session?.user?.id }, include: { Student: { include: { Skills: true, projects: true } } } });
  if (!session?.user) redirect("/signin");
  return <Achievement session={session!} userData={data!} />;
}
