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
  });
  if (findUser?.job !== "Undefined") {
    return redirect("/profile");
  }
  return <Insert />;
}
