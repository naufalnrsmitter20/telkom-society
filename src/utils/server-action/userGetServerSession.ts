"use server";

import { Gender, Job, Religion, Role, Status } from "@prisma/client";
import { createUser, updateUser } from "../user.query";
import { revalidatePath } from "next/cache";

export const UpdateUserById = async (id: string | null, data: FormData) => {
  try {
    const email = data.get("email") as string;
    const photo_profile = data.get("photo_profile") as string;
    const name = data.get("name") as string;
    const role = data.get("role") as Role;
    const job = data.get("job") as Job;
    const biography = data.get("biography") as string;
    const status = data.get("status") as Status;
    const linkedin = data.get("linkedin") as string;
    const github = data.get("github") as string;
    const instagram = data.get("instagram") as string;
    const website = data.get("website") as string;
    const whatsapp = data.get("whatsapp") as string;
    const BirthDate = data.get("BirthDate") as string;
    const religion = data.get("religion") as Religion;
    const gender = data.get("gender") as Gender;
    const certificates = JSON.parse(data.get("certificates") as string) as { id: string; name: string; description: string; link: string }[];
    const projects = JSON.parse(data.get("projects") as string) as { id: string; name: string; link: string }[];
    const Skills = JSON.parse(data.get("Skills") as string) as string[];

    const findEmail = await prisma.user.findUnique({ where: { email } });
    if (id == null && !findEmail) {
      const create = await createUser({
        email,
        photo_profile,
        name,
        role,
        job,
        biography,
        status,
        linkedin,
        github,
        instagram,
        website,
        whatsapp,
        BirthDate,
        religion,
        gender,
        certificates: {
          create: certificates.map((certificate) => ({
            id: certificate.id,
            name: certificate.name,
            description: certificate.description,
            link: certificate.link,
          })),
        },
        projects: {
          create: projects.map((project) => ({
            id: project.id,
            name: project.name,
            link: project.link,
          })),
        },
        Skills: {
          create: Skills.map((skill) => ({
            SkillName: skill,
          })),
        },
      });
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({ where: { id } });

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,
          biography: biography ?? findUserWithId?.biography,
          BirthDate: BirthDate ?? findUserWithId?.BirthDate,
          linkedin: linkedin ?? findUserWithId?.linkedin,
          github: github ?? findUserWithId?.github,
          instagram: instagram ?? findUserWithId?.instagram,
          website: website ?? findUserWithId?.website,
          whatsapp: whatsapp ?? findUserWithId?.whatsapp,
          gender: gender ?? findUserWithId?.gender,
          role: role ?? findUserWithId?.role,
          job: job ?? findUserWithId?.job,
          status: status ?? findUserWithId?.status,
          photo_profile: photo_profile ?? findUserWithId?.photo_profile,
          religion: religion ?? findUserWithId?.religion,
          certificates: {
            deleteMany: {},
            create: certificates,
          },
          projects: {
            deleteMany: {},
            create: projects,
          },
          Skills: {
            deleteMany: {},
            connectOrCreate: Skills.map((skill) => ({
              where: { SkillName: skill },
              create: {
                SkillName: skill,
              },
            })),
          },
        }
      );
      if (!update) throw new Error("Update failed");
    } else {
      throw new Error("Email already exists");
    }
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
