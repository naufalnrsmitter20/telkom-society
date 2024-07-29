"use server";

import { Gender, Job, Religion, Role, Status } from "@prisma/client";
import prisma from "@/lib/prisma";
import { createUser, findUser, updateUser } from "../user.query";
import { revalidatePath } from "next/cache";
import { nextGetServerSession } from "@/lib/authOption";
import { GetServerSideProps } from "next";

export const UpdateUserById = async (data: FormData) => {
  try {
    const session = await nextGetServerSession();

    const id = session?.user?.id;

    const email = data.get("email") as string;
    const photo_profile = data.get("photo_profile") as string;
    const name = data.get("name") as string;
    const role = data.get("role") as Role;
    const job = data.get("job") as Job;
    const clasess = data.get("clasess") as string;
    const absent = data.get("absent") as string;
    const Phone = data.get("Phone") as string;
    const NIS = data.get("NIS") as string;
    const NISN = data.get("NISN") as string;
    const schoolOrigin = data.get("schoolOrigin") as string;
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
    const certificates = JSON.parse((data.get("certificates") as string) || "[]") as { CertificateName: string; img: string; link: string }[];
    const projects = JSON.parse((data.get("projects") as string) || "[]") as { ProjeectName: string; link: string }[];
    const Skills = JSON.parse((data.get("Skills") as string) || "[]") as string[];

    if (!id) {
      const create = await createUser({
        email,
        photo_profile,
        name,
        role,
        job,
        clasess,
        absent,
        NIS,
        NISN,
        Phone,
        schoolOrigin,
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
            CertificateName: certificate.CertificateName,
            img: certificate.img,
            link: certificate.link,
          })),
        },
        projects: {
          create: projects.map((project) => ({
            ProjeectName: project.ProjeectName,
            link: project.link,
          })),
        },
        Skills: {
          create: Skills.map((skill) => ({
            SkillName: skill,
          })),
        },
      });
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({ where: { id }, include: { certificates: true, Skills: true, projects: true } });
      const skillsToDisconnect = findUserWithId?.Skills.filter((existingSkill) => !Skills.includes(existingSkill.SkillName)) || [];
      const certificatesToDisconnect = findUserWithId?.certificates.filter((existingCertificate) => !certificates.some((cert) => cert.CertificateName === existingCertificate.CertificateName));
      const projectsToDisconnect = findUserWithId?.projects.filter((existingProject) => !projects.some((proj) => proj.ProjeectName === existingProject.ProjeectName));

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,
          absent: absent ?? findUserWithId?.absent,
          clasess: clasess ?? findUserWithId?.clasess,
          NIS: NIS ?? findUserWithId?.NIS,
          NISN: NISN ?? findUserWithId?.NISN,
          schoolOrigin: schoolOrigin ?? findUserWithId?.schoolOrigin,
          Phone: Phone ?? findUserWithId?.Phone,
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
            connectOrCreate: certificates.map((certificate) => ({
              where: { CertificateName: certificate.CertificateName, img: certificate.img, link: certificate.link },
              create: {
                CertificateName: certificate.CertificateName,
                img: certificate.img,
                link: certificate.link,
              },
            })),
            disconnect: certificatesToDisconnect?.map((certificate) => ({
              CertificateName: certificate.CertificateName,
            })),
          },
          projects: {
            connectOrCreate: projects.map((project) => ({
              where: { ProjeectName: project.ProjeectName, link: project.link },
              create: {
                ProjeectName: project.ProjeectName,
                link: project.link,
              },
            })),
            disconnect: projectsToDisconnect?.map((project) => ({
              ProjeectName: project.ProjeectName,
            })),
          },
          Skills: {
            connectOrCreate: Skills.map((skill) => ({
              where: { SkillName: skill },
              create: {
                SkillName: skill,
              },
            })),
            disconnect: skillsToDisconnect.map((skill) => ({
              SkillName: skill.SkillName,
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

export const UpdateGeneralProfileById = async (data: FormData) => {
  try {
    const session = await nextGetServerSession();

    const id = session?.user?.id;

    const email = data.get("email") as string;
    const photo_profile = data.get("photo_profile") as string;
    const name = data.get("name") as string;
    const role = data.get("role") as Role;
    const job = data.get("job") as Job;
    const clasess = data.get("clasess") as string;
    const absent = data.get("absent") as string;
    const Phone = data.get("Phone") as string;
    const NIS = data.get("NIS") as string;
    const NISN = data.get("NISN") as string;
    const schoolOrigin = data.get("schoolOrigin") as string;
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

    if (!id) {
      const create = await createUser({
        email,
        photo_profile,
        name,
        role,
        job,
        clasess,
        absent,
        NIS,
        NISN,
        Phone,
        schoolOrigin,
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
      });
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({ where: { id }, include: { certificates: true, Skills: true, projects: true } });

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,
          absent: absent ?? findUserWithId?.absent,
          clasess: clasess ?? findUserWithId?.clasess,
          NIS: NIS ?? findUserWithId?.NIS,
          NISN: NISN ?? findUserWithId?.NISN,
          schoolOrigin: schoolOrigin ?? findUserWithId?.schoolOrigin,
          Phone: Phone ?? findUserWithId?.Phone,
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

export const UpdateUserSkillById = async (data: FormData) => {
  try {
    const session = await nextGetServerSession();

    const id = session?.user?.id;

    const email = data.get("email") as string;
    const name = data.get("name") as string;

    const Skills = JSON.parse((data.get("Skills") as string) || "[]") as string[];

    if (!id) {
      const create = await createUser({
        email,
        name,

        Skills: {
          create: Skills.map((skill) => ({
            SkillName: skill,
          })),
        },
      });
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({ where: { id }, include: { certificates: true, Skills: true, projects: true } });
      const skillsToDisconnect = findUserWithId?.Skills.filter((existingSkill) => !Skills.includes(existingSkill.SkillName)) || [];

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,

          Skills: {
            connectOrCreate: Skills.map((skill) => ({
              where: { SkillName: skill },
              create: {
                SkillName: skill,
              },
            })),
            disconnect: skillsToDisconnect?.map((skill) => ({
              SkillName: skill.SkillName,
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

export const UpdateUserProjectById = async (data: FormData) => {
  try {
    const session = await nextGetServerSession();

    const id = session?.user?.id;

    const email = data.get("email") as string;
    const name = data.get("name") as string;

    const projects = JSON.parse((data.get("projects") as string) || "[]") as { ProjeectName: string; link: string }[];

    if (!id) {
      const create = await createUser({
        email,
        name,

        projects: {
          create: projects.map((project) => ({
            ProjeectName: project.ProjeectName,
            link: project.link,
          })),
        },
      });
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({ where: { id }, include: { certificates: true, Skills: true, projects: true } });
      const projectsToDisconnect = findUserWithId?.projects.filter((existingProject) => !projects.some((proj) => proj.ProjeectName === existingProject.ProjeectName));

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,

          projects: {
            connectOrCreate: projects.map((project) => ({
              where: { ProjeectName: project.ProjeectName, link: project.link },
              create: {
                ProjeectName: project.ProjeectName,
                link: project.link,
              },
            })),
            disconnect: projectsToDisconnect?.map((project) => ({
              ProjeectName: project.ProjeectName,
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
