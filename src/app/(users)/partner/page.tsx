import React from "react";
import Main from "./_components/Main";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";

export default async function Partner() {
  const session = await nextGetServerSession();
  const getUser = await prisma.user.findMany({
    where: { AND: [{ NOT: { role: "ADMIN" } }, { NOT: { role: "GURU" } }, { NOT: { id: session?.user?.id } }] },
    include: { Student: { include: { UserJob: true } } },
  });
  const getCurrentUser = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  });
  return (
    <main className="min-h-screen bg-slate-100 py-36">
      <section>
        <Main currentUser={getCurrentUser!} session={session!} userData={getUser} />
      </section>
    </main>
  );
}
