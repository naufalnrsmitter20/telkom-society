import { nextGetServerSession } from "@/lib/authOption";
import Insert from "./_components/Insert";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function PilihKeahlian() {
  const session = await nextGetServerSession();
  if (!session?.user?.email) {
    return redirect("signin");
  }
  const findUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: { Student: { include: { UserJob: true } } },
  });
  const findJob = await prisma.userJob.findMany({
    where: { jobName: { not: "Undefined" } },
  });
  if (findUser?.Student?.UserJob?.jobName !== undefined) {
    return redirect("/profile");
  }
  return <Insert jobData={findJob} />;
}
