"use server";

import { Gender, Job, Religion, Role, Status } from "@prisma/client";
import prisma from "@/lib/prisma";
import { createUser, findUser, updateUser } from "../user.query";
import { revalidatePath } from "next/cache";
import { nextGetServerSession } from "@/lib/authOption";
import { GetServerSideProps } from "next";
import { hash } from "bcrypt";
// import { getImage } from "../formidable";

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
    const generation = data.get("generation") as string;
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
    const projects = JSON.parse((data.get("projects") as string) || "[]") as {
      ProjeectName: string;
      link: string;
    }[];
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
        generation,
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
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { certificates: true, Skills: true, projects: true },
      });
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
          generation: generation ?? findUserWithId?.generation,
          status: status ?? findUserWithId?.status,
          photo_profile: photo_profile ?? findUserWithId?.photo_profile,
          religion: religion ?? findUserWithId?.religion,
          certificates: {
            connectOrCreate: certificates.map((certificate) => ({
              where: {
                CertificateName: certificate.CertificateName,
                img: certificate.img,
                link: certificate.link,
              },
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

export const updateRole = async (id: string, data: FormData) => {
  try {
    const session = await nextGetServerSession();
    if (!session) {
      throw new Error("eror");
    }

    const role = data.get("role") as Role;
    const update = await prisma.user.update({
      where: { id: id },
      data: {
        role,
      },
    });
    if (!update) {
      throw new Error("eror");
    }
    revalidatePath("/admin/studentData");
    return update;
  } catch (error) {
    throw new Error((error as Error).message);
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
    const generation = data.get("generation") as string;
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
        generation,
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
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { certificates: true, Skills: true, projects: true },
      });

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,
          absent: absent ?? findUserWithId?.absent,
          generation: generation ?? findUserWithId?.generation,
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
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { certificates: true, Skills: true, projects: true },
      });
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

    const projects = JSON.parse((data.get("projects") as string) || "[]") as {
      ProjeectName: string;
      link: string;
    }[];

    if (!id && !data) {
      const create = await updateUser(
        { id },
        {
          projects: {
            create: projects.map((project) => ({
              ProjeectName: project.ProjeectName,
              link: project.link,
            })),
          },
        }
      );
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { projects: true },
      });
      const projectsToDisconnect = findUserWithId?.projects.filter((existingProject) => !projects.some((proj) => proj.ProjeectName === existingProject.ProjeectName));

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          // email: email ?? findUserWithId?.email,
          // name: name ?? findUserWithId?.name,

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
      revalidatePath("/profile");
      return update;
    }
  } catch (error) {
    console.error("Error updating projects:", error);
    throw error;
  }
};

export const UpdateAdminById = async (id: string, data: FormData) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user) {
      return { status: 401, message: "Auth Required" };
    }
    if (session?.user.role !== "ADMIN") {
      return { status: 401, message: "Unauthorize" };
    }
    const email = data.get("email") as string;
    const name = data.get("name") as string;
    const password = data.get("password") as string;
    const role = data.get("role") as Role;

    const findEmail = await prisma.user.findUnique({
      where: { email },
      include: { userAuth: true },
    });

    if (!findEmail && id == null) {
      const create = await prisma.user.create({
        data: {
          email,
          name,
          role,
          userAuth: {
            create: {
              password: await hash(password, 10),
              last_login: new Date(),
            },
          },
        },
      });
      if (!create) throw new Error("Failed to create admin!");
      revalidatePath("/admin");
      return { status: 200, message: "Create Success!" };
    } else if (id) {
      const findUser = await prisma.user.findFirst({
        where: { id },
        include: { userAuth: true },
      });
      if (findUser) {
        const update = await prisma.user.update({
          where: { id: id ?? findUser?.id },
          data: {
            name: name ?? findUser?.name,
            email: email ?? findUser?.email,
            role: role ?? (findUser?.role as Role),
            userAuth: {
              update: {
                last_login: new Date(),
              },
            },
          },
        });
        console.log(update);
        if (!update) throw new Error("Failed to update admin!");
        revalidatePath("/admin");
        return { status: 200, message: "Update Success!" };
      } else throw new Error("User not found!");
    }
    revalidatePath("/admin");
    return { status: 200, message: "Update Success!" };
  } catch (error) {
    console.error("Error update user:", error);
    throw new Error((error as Error).message);
  }
};

export const UpdateUserByIdInAdmin = async (id: string, data: FormData) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user) {
      return { status: 401, message: "Auth Required" };
    }
    if (session?.user.role !== "ADMIN") {
      return { status: 401, message: "Unauthorize" };
    }
    const email = data.get("email") as string;
    const name = data.get("name") as string;
    const password = data.get("password") as string;
    const role = data.get("role") as Role;

    const findEmail = await prisma.user.findUnique({
      where: { email },
      include: { userAuth: true },
    });

    if (!findEmail && id == null) {
      const create = await prisma.user.create({
        data: {
          email,
          name,
          role,
          userAuth: {
            create: {
              password: await hash(password, 10),
              last_login: new Date(),
            },
          },
        },
      });
      if (!create) throw new Error("Failed to create admin!");
      revalidatePath("/admin");
      return { status: 200, message: "Create Success!" };
    } else if (id) {
      const findUser = await prisma.user.findFirst({
        where: { id },
        include: { userAuth: true },
      });
      if (findUser) {
        const update = await prisma.user.update({
          where: { id: id ?? findUser?.id },
          data: {
            name: name ?? findUser?.name,
            email: email ?? findUser?.email,
            role: role ?? (findUser?.role as Role),
            userAuth: {
              update: {
                last_login: new Date(),
              },
            },
          },
        });
        console.log(update);
        if (!update) throw new Error("Failed to update admin!");
        revalidatePath("/admin");
        return { status: 200, message: "Update Success!" };
      } else throw new Error("User not found!");
    }
    revalidatePath("/admin");
    return { status: 200, message: "Update Success!" };
  } catch (error) {
    console.error("Error update user:", error);
    throw new Error((error as Error).message);
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const session = await nextGetServerSession();
    if (!session?.user) {
      return { status: 401, message: "Auth Required" };
    }
    if (session?.user.role === "SISWA") {
      return { status: 401, message: "Unauthorize" };
    }
    const del = await prisma.user.delete({
      where: { id },
    });
    if (!del) {
      return { status: 400, message: "Failed to delete user!" };
    }
    revalidatePath("/admin/studentData");
    revalidatePath("/admin");
    return { status: 200, message: "Delete Success!" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error((error as Error).message);
  }
};
