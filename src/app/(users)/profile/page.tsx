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
    include: { certificates: true, invitation: true, projects: true, Skills: true, Team: true, teamRequest: true, userAuth: true },
  });

  return (
    <>
      <ContentProfile userData={findUser!} session={session} />
    </>
  );
}
