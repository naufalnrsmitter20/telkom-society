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
        member: { create: { userId: UserId as string, role: "OWNER", joinedAt: new Date() } },
      },
    });
    if (!CreateTeam) {
      throw new Error("Gagal Membuat Tim!");
    }
    const updateUser = await prisma.user.update({
      where: { id: UserId as string },
      data: { status: "Have_Team" },
    });
    if (!updateUser) {
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
    throw new Error((error as Error).message);
  }
};

export const InviteMember = async (formData: FormData) => {
  try {
    const session = await nextGetServerSession();
    const ownerId = session?.user?.id!;
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }

    const member = formData.getAll("member") as string[];

    const findTeam = await prisma.team.findFirst({
      where: { ownerId: ownerId as string },
    });

    await Promise.all(
      member.map(async (user) => {
        const updateRequest = await prisma.teamRequest.create({
          data: {
            senderId: ownerId as string,
            receiverId: user,
            teamId: findTeam?.id as string,
            type: "INVITE",
            status: "PENDING",
            createAt: new Date(),
          },
        });
        await prisma.user.update({
          where: { id: user },
          data: {
            notiification: {
              create: {
                title: "Invitation to Join Team",
                message: "You have been invited to join the team",
                createAt: new Date(),
                teamRequest: {
                  connect: { id: updateRequest?.id },
                },
              },
            },
          },
        });
        if (!updateRequest) {
          throw new Error("Failed Invite Member!");
        }

        return updateRequest;
      })
    );

    revalidatePath("/profile");
    return { message: "Success Invite Member!", status: 200 };
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
      await prisma.user.update({
        where: { id: memberId },
        data: {
          status: "Have_Team",
          notiification: {
            update: {
              where: { id: acc.notificationId as string },
              data: {
                title: "Invitation to Join Team",
                message: "You Accepted the Invitation",
                createAt: new Date(),
                teamRequest: {
                  connect: { id: acc?.id },
                },
              },
            },
          },
        },
      });
    }
    if (!acc) {
      throw new Error("Failed to Accept!");
    }
    revalidatePath("/profile/notification");
    return acc;
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
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
    await prisma.user.update({
      where: { id: memberId },
      data: {
        status: "Dont_Have_Team",
        notiification: {
          update: {
            where: { id: den.notificationId as string },
            data: {
              title: "Invitation to Join Team",
              message: "You Denied the Invitation",
              createAt: new Date(),
              teamRequest: {
                connect: { id: den?.id },
              },
            },
          },
        },
      },
    });
    revalidatePath("/profile/notification");
    return den;
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
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
    await prisma.user.update({
      where: { id: memberId },
      data: {
        notiification: {
          create: {
            title: "Request to Join Team",
            message: "You are Request to join the team",
            createAt: new Date(),
            teamRequest: {
              connect: { id: request?.id },
            },
          },
        },
      },
    });

    revalidatePath("/division/join");
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
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
      await prisma.user.update({
        where: { id: acc.receiverId },
        data: {
          status: "Have_Team",
          notiification: {
            update: {
              where: { id: acc.notificationId as string },
              data: {
                title: "Request to Join Team",
                message: "You have been approved to join the team",
                createAt: new Date(),
                teamRequest: {
                  connect: { id: acc?.id },
                },
              },
            },
          },
        },
      });
      // await prisma.teamRequest.delete({
      //   where: { id: id },
      // });
    }
    if (!acc) {
      throw new Error("Failed Accept!");
    }
    revalidatePath("/division/join");
    return acc;
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
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
    await prisma.user.update({
      where: { id: den.receiverId },
      data: {
        status: "Dont_Have_Team",
        notiification: {
          update: {
            where: { id: den.notificationId as string },
            data: {
              title: "Request to Join Team",
              message: "You have been rejected to join the team",
              createAt: new Date(),
              teamRequest: {
                connect: { id: den?.id },
              },
            },
          },
        },
      },
    });
    // await prisma.teamRequest.delete({
    //   where: { id: id },
    // });

    revalidatePath("/division/join");
    return den;
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
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

    const findTeam = await prisma.team.findFirst({ where: { id: del.teamId } });

    await prisma.user.update({
      where: { id: del.receiverId },
      data: {
        status: "Dont_Have_Team",
        notiification: {
          update: {
            where: { id: del.notificationId as string },
            data: {
              title: `Invitation Canceled`,
              message: `Invitation Canceled by Owner of ${findTeam?.name}`,
              createAt: new Date(),
            },
          },
        },
      },
    });
    if (!del) {
      throw new Error("Failed to Cancel Invite!");
    }
    revalidatePath("/profile/notification");
    return del;
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
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
    if (!del) {
      throw new Error("Failed to Kick Member!");
    }
    const findTeam = await prisma.team.findFirst({
      where: { id: del.teamId },
    });
    await prisma.user.update({
      where: { id: del.userId },
      data: {
        status: "Dont_Have_Team",
        notiification: {
          create: {
            title: `You have been removed from ${findTeam?.name}`,
            message: `You have been kicked from the ${findTeam?.name}`,
            createAt: new Date(),
          },
        },
      },
    });
    revalidatePath("/division/profile");
    return del;
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
  }
};

export const deleteTeam = async (teamId: string) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user?.email) {
      throw new Error("Auth Required!");
    }
    const findTeam = await prisma.team.findFirst({
      where: { id: teamId },
    });
    if (findTeam?.ownerId != session.user.id) {
      return { status: 401, message: "Unauthorize" };
    }
    const del = await prisma.team.delete({
      where: { id: teamId },
    });
    if (!del) {
      return { status: 400, message: "Failed to Delete Team!" };
    }

    const updateOwner = await prisma.user.update({
      where: { id: session.user.id },
      data: { status: "Dont_Have_Team" },
    });
    const updateUser = await prisma.user.updateMany({
      where: { Team: { every: { teamId: teamId } } },
      data: { status: "Dont_Have_Team" },
    });
    if (!updateOwner || !updateUser) {
      return { status: 400, message: "Failed to Delete User from Team!" };
    }
    await prisma.notification.deleteMany({
      where: { teamRequest: { every: { teamId: teamId } } },
    });

    revalidatePath("/division/profile");
    return { status: 200, message: "Success Delete Team!" };
  } catch (error) {
    console.log(error as Error);
    throw new Error((error as Error).message);
  }
};
