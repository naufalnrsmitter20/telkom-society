import React from "react";
import Home from "./_components/Home";
import prisma from "@/lib/prisma";

export default async function page() {
  const users = await prisma.user.findMany({ where: { role: "SISWA" } });
  const teams = await prisma.team.findMany({ where: { teamStatus: "ACTIVE" } });
  return <Home teams={teams} users={users} />;
}
