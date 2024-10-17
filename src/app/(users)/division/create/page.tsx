import React from "react";
import CreateTeamPage from "./_components/createTeam";
import prisma from "@/lib/prisma";

export default async function TeamsCreate() {
  const data = await prisma.teacher.findMany({ include: { user: true } });
  return <CreateTeamPage data={data} />;
}
