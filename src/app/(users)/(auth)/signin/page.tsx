import React from "react";
import LoginPage from "./_components/LoginPage";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";

export default async function Signin() {
  const session = await nextGetServerSession();
  const getUserPayload = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: { certificates: true, invitation: true, projects: true, Skills: true, Team: { include: { team: { include: { member: { include: { user: true } } } }, user: true } }, teamRequest: true, userAuth: true },
  });
  return <LoginPage session={session!} userData={getUserPayload!} />;
}
