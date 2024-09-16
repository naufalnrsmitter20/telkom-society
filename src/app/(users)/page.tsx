import React from "react";
import Home from "./_components/Home";
import prisma from "@/lib/prisma";

export default async function page() {
  const users = await prisma.user.findMany();
  const teams = await prisma.team.findMany();
  return <Home teams={teams} users={users} />;
}
