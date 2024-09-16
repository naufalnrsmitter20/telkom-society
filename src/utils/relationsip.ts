import { Prisma } from "@prisma/client";

export type userWithLastLogin = Prisma.UserGetPayload<{
  include: { userAuth: { select: { last_login: true } } };
}>;

export type userFullPayload = Prisma.UserGetPayload<{
  include: { certificates: true; invitation: true; projects: true; Skills: true; Team: true; teamRequest: true; userAuth: true };
}>;
