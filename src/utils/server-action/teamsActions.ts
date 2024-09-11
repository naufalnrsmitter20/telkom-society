"use server";
import { nextGetServerSession } from "@/lib/authOption";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export const CreateTeam = async (data: FormData) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }
    const UserId = session.user.id;
    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const logo = data.get("logo") as string;
    const mentor = data.get("mentor") as string;
    const instagram = data.get("instagram") as string;
    const linkedin = data.get("linkedin") as string;

    const CreateTeam = await prisma.team.create({
      data: {
        name: name ?? "",
        description: description ?? "",
        mentor: mentor ?? "",
        instagram: instagram ?? "",
        linkedin: linkedin ?? "",
        logo: logo ?? "",
        ownerId: UserId as string,
        createAt: new Date(),
      },
    });
    if (!CreateTeam) {
      throw new Error("Gagal Membuat Tim!");
    }
    revalidatePath("/division/profile");
    return CreateTeam;
  } catch (error) {
    console.log(error as Error);
    throw error;
  }
};

export const UpdateTeam = async (id: string, data: FormData) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }

    if (!id) {
      throw new Error("Team Not Found!");
    }

    const name = data.get("name") as string;
    const description = data.get("description") as string;
    const logo = data.get("logo") as string;
    const mentor = data.get("mentor") as string;
    const instagram = data.get("instagram") as string;
    const linkedin = data.get("linkedin") as string;

    if (id) {
      const update = await prisma.team.update({
        where: { id: id },
        data: {
          name: name ?? "",
          description: description ?? "",
          mentor: mentor ?? "",
          instagram: instagram ?? "",
          linkedin: linkedin ?? "",
          logo: logo ?? "",
          createAt: new Date(),
        },
      });
      if (!update) {
        throw new Error("Gagal Membuat Tim!");
      }
      revalidatePath("/division/profile");
    }
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};

export const InviteMember = async (memberId: string) => {
  try {
    const session = await nextGetServerSession();
    const ownerId = session?.user?.id!;
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }

    const findTeam = await prisma.team.findFirst({
      where: { ownerId: ownerId as string },
    });

    const findCurrentInvite = await prisma.teamRequest.findFirst({
      where: { receiverId: memberId },
    });

    if (findCurrentInvite?.receiverId === memberId) {
      throw new Error("User Already Invited!");
    }
    if (memberId) {
      const invite = await prisma.teamRequest.create({
        data: {
          senderId: ownerId as string,
          receiverId: memberId,
          teamId: findTeam?.id as string,
          type: "INVITE",
          status: "PENDING",
          createAt: new Date(),
        },
      });
      if (!invite) {
        throw new Error("Failed Invitations!");
      }
      revalidatePath("/profile");
      return invite;
    }
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
  }
};

export const AcceptInviteMember = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    const memberId = session?.user?.id;
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }
    const acc = await prisma.teamRequest.update({
      where: { id: id, receiverId: memberId },
      data: {
        status: "VERIFIED",
      },
    });
    if (acc.status === "VERIFIED") {
      await prisma.teamMember.create({
        data: {
          joinedAt: new Date(),
          userId: memberId as string,
          teamId: acc.teamId,
          role: "MEMBER",
        },
      });
      await prisma.teamRequest.delete({
        where: { id: id },
      });
    }
    if (!acc) {
      throw new Error("Failed to Accept!");
    }
    revalidatePath("/profile/notification");
    return acc;
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};
export const DeniedInviteMember = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    const memberId = session?.user?.id;
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }
    const den = await prisma.teamRequest.update({
      where: { id: id, receiverId: memberId },
      data: {
        status: "DENIED",
      },
    });
    if (!den) {
      throw new Error("Failed to Denied!");
    }
    const del = await prisma.teamRequest.delete({
      where: { id: id },
    });
    revalidatePath("/profile/notification");
    return del;
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};

export const RequestTeam = async (teamId: string) => {
  try {
    const session = await nextGetServerSession();
    const memberId = session?.user?.id;
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }

    const findOwner = await prisma.team.findFirst({
      where: { id: teamId },
      include: { member: true },
    });

    const request = await prisma.teamRequest.create({
      data: {
        receiverId: memberId as string,
        teamId: teamId,
        senderId: findOwner?.ownerId as string,
        type: "REQUEST",
        status: "PENDING",
        createAt: new Date(),
      },
    });
    if (!request) {
      throw new Error("Failed Request!");
    }
    revalidatePath("/division/join");
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};

export const AcceptRequest = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    const onwerId = session?.user?.id;
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }
    const acc = await prisma.teamRequest.update({
      where: { id, senderId: onwerId },
      data: {
        status: "VERIFIED",
      },
    });
    if (acc.status === "VERIFIED") {
      await prisma.teamMember.create({
        data: {
          joinedAt: new Date(),
          userId: acc.receiverId,
          teamId: acc.teamId,
          role: "MEMBER",
        },
      });
      await prisma.teamRequest.delete({
        where: { id: id },
      });
    }
    if (!acc) {
      throw new Error("Failed Accept!");
    }
    revalidatePath("/division/join");
    return acc;
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};

export const DeniedRequest = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    const onwerId = session?.user?.id;
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }

    const den = await prisma.teamRequest.update({
      where: { id, senderId: onwerId },
      data: {
        status: "DENIED",
      },
    });
    if (!den) {
      throw new Error("Failed Denied!");
    }

    await prisma.teamRequest.delete({
      where: { id: id },
    });

    revalidatePath("/division/join");
    return den;
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};

export const CancelInviteMember = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }
    const del = await prisma.teamRequest.delete({
      where: { id: id },
    });
    revalidatePath("/profile/notification");
    return del;
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};
export const KickMember = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }
    const del = await prisma.teamMember.delete({
      where: { id: id },
    });
    revalidatePath("/division/profile");
    return del;
  } catch (error) {
    console.log(error as Error);
    throw new Error("Internal Server Error!");
  }
};
