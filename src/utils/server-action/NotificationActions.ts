"use server";

import { nextGetServerSession } from "@/lib/authOption";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DeleteNotification = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user) {
      return { status: 401, message: "Auth Required!" };
    }
    const del = await prisma.notification.delete({ where: { id } });
    if (!del) {
      return { status: 400, message: "Failed to delete notification!" };
    }
    revalidatePath("/profile/notification");
    return { status: 200, message: "Notification Deleted!" };
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
  }
};
export const DeleteAllNotification = async (userId: string) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user) {
      return { status: 401, message: "Auth Required!" };
    }
    const del = await prisma.notification.deleteMany({ where: { receiverId: userId as string } });
    if (!del) {
      return { status: 400, message: "Failed to delete notification!" };
    }
    revalidatePath("/profile/notification");
    return { status: 200, message: "Success to Clear Notification!" };
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
  }
};
