import React from "react";
import CreateTeam from "./_components/createTeam";
import prisma from "@/lib/prisma";

export default async function TeamsCreate() {
  const user = await prisma.user.findMany({
    where: { role: "GURU" },
  });
  return <CreateTeam user={user} />;
}
