import { PrismaClient, Role, User, Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

const prismaClient = new PrismaClient();

const createUser = async (data: Prisma.UserUncheckedCreateInput) => {
  return await prismaClient.user.create({ data });
};

const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  update: Prisma.UserUpdateInput
) => {
  return await prismaClient.user.update({ where, data: update });
};

// Function to convert string to Role enum
const mapRoleStringToEnum = (role: string): Role => {
  const roleUpper = role.toUpperCase() as Role;
  return roleUpper;
};

export const updateUserRole = async (email: string, newRole: string) => {
  const roleEnum = mapRoleStringToEnum(newRole);
  return await updateUser(
    { email },
    { role: roleEnum }
  );
};
