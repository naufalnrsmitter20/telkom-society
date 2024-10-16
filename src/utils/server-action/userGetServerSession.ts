"use server";

import { Gender, Religion, Role, Status } from "@prisma/client";
import prisma from "@/lib/prisma";
import { createUser, findUser, updateUser } from "../user.query";
import { revalidatePath } from "next/cache";
import { nextGetServerSession } from "@/lib/authOption";
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
    const absent = data.get("absent") as string;
    const generation = data.get("generation") as string;
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
        linkedin,
        github,
        instagram,
        website,
        whatsapp,
        religion,
        gender,
        Student: {
          create: {
            username: name,
            absent,
            biography,
            BirthDate,
            generation,
            NIS,
            NISN,
            status,
            schoolOrigin,
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
          },
        },
      });
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { Student: { include: { certificates: true, Skills: true, projects: true, ClassOfTalent: true, UserJob: true } } },
      });
      const skillsToDisconnect = findUserWithId?.Student?.Skills.filter((existingSkill) => !Skills.includes(existingSkill.SkillName)) || [];
      const certificatesToDisconnect = findUserWithId?.Student?.certificates.filter((existingCertificate) => !certificates.some((cert) => cert.CertificateName === existingCertificate.CertificateName));
      const projectsToDisconnect = findUserWithId?.Student?.projects.filter((existingProject) => !projects.some((proj) => proj.ProjeectName === existingProject.ProjeectName));

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,
          linkedin: linkedin ?? findUserWithId?.linkedin,
          github: github ?? findUserWithId?.github,
          instagram: instagram ?? findUserWithId?.instagram,
          website: website ?? findUserWithId?.website,
          whatsapp: whatsapp ?? findUserWithId?.whatsapp,
          gender: gender ?? findUserWithId?.gender,
          photo_profile: photo_profile ?? findUserWithId?.photo_profile,
          role: role ?? findUserWithId?.role,
          Student: {
            update: {
              absent: absent ?? findUserWithId?.Student?.absent,
              NIS: NIS ?? findUserWithId?.Student?.NIS,
              NISN: NISN ?? findUserWithId?.Student?.NISN,
              schoolOrigin: schoolOrigin ?? findUserWithId?.Student?.schoolOrigin,
              biography: biography ?? findUserWithId?.Student?.biography,
              BirthDate: BirthDate ?? findUserWithId?.Student?.BirthDate,
              generation: generation ?? findUserWithId?.Student?.generation,
              status: status ?? findUserWithId?.Student?.status,
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
            },
          },
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

export const updateJobById = async (data: FormData) => {
  try {
    const session = await nextGetServerSession();

    const id = session?.user?.id;
    const jobId = data.get("jobId") as string;

    if (!id) throw new Error("User not found");
    const update = await prisma.user.update({ where: { id }, data: { Student: { update: { jobId: jobId } } } });
    if (!update) throw new Error("Failed to update job");
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating Job:", error);
    throw error;
  }
};

export const updateClassById = async (data: FormData) => {
  try {
    const classOfTalentId = data.get("clasessId") as string;
    const session = await nextGetServerSession();
    const id = session?.user?.id;
    console.log(classOfTalentId);

    if (!id) throw new Error("User not found");
    const update = await prisma.user.update({ where: { id }, data: { Student: { update: { classOfTalentId: classOfTalentId } } } });
    if (!update) throw new Error("Failed to update Class");
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error updating class:", error);
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
    const jobName = data.get("jobName") as string;
    const jobDesc = data.get("jobDesc") as string;
    const studentClass = data.get("clasess") as string;
    const absent = data.get("absent") as string;
    const generation = data.get("generation") as string;
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
        linkedin,
        github,
        instagram,
        website,
        whatsapp,
        religion,
        gender,
        Student: {
          create: {
            username: name,
            absent,
            generation,
            NIS,
            NISN,
            schoolOrigin,
            biography,
            status,
            BirthDate,
            ClassOfTalent: { create: { Studentclass: studentClass } },
            UserJob: { create: { jobName, jobDesc } },
          },
        },
      });
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { Student: { include: { certificates: true, Skills: true, projects: true, ClassOfTalent: true, UserJob: true } } },
      });

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,
          linkedin: linkedin ?? findUserWithId?.linkedin,
          github: github ?? findUserWithId?.github,
          instagram: instagram ?? findUserWithId?.instagram,
          website: website ?? findUserWithId?.website,
          whatsapp: whatsapp ?? findUserWithId?.whatsapp,
          gender: gender ?? findUserWithId?.gender,
          role: role ?? findUserWithId?.role,
          photo_profile: photo_profile ?? findUserWithId?.photo_profile,
          religion: religion ?? findUserWithId?.religion,
          Student: {
            update: {
              absent: absent ?? findUserWithId?.Student?.absent,
              generation: generation ?? findUserWithId?.Student?.generation,
              NIS: NIS ?? findUserWithId?.Student?.NIS,
              NISN: NISN ?? findUserWithId?.Student?.NISN,
              schoolOrigin: schoolOrigin ?? findUserWithId?.Student?.schoolOrigin,
              biography: biography ?? findUserWithId?.Student?.biography,
              BirthDate: BirthDate ?? findUserWithId?.Student?.BirthDate,
              status: status ?? findUserWithId?.Student?.status,
              ClassOfTalent: { create: { Studentclass: studentClass ?? findUserWithId?.Student?.ClassOfTalent?.Studentclass } },
              UserJob: { create: { jobName: jobName ?? findUserWithId?.Student?.UserJob?.jobName, jobDesc: jobDesc ?? findUserWithId?.Student?.UserJob?.jobDesc } },
            },
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
        Student: {
          create: {
            username: name,
            Skills: {
              create: Skills.map((skill) => ({
                SkillName: skill,
              })),
            },
          },
        },
      });
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { Student: { include: { certificates: true, Skills: true, projects: true } } },
      });
      const skillsToDisconnect = findUserWithId?.Student?.Skills.filter((existingSkill) => !Skills.includes(existingSkill.SkillName)) || [];

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          email: email ?? findUserWithId?.email,
          name: name ?? findUserWithId?.name,
          Student: {
            update: {
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
            },
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
    const projects = JSON.parse((data.get("projects") as string) || "[]") as {
      ProjeectName: string;
      link: string;
    }[];

    if (!id && !data) {
      const create = await updateUser(
        { id },
        {
          Student: {
            update: {
              projects: {
                create: projects.map((project) => ({
                  ProjeectName: project.ProjeectName,
                  link: project.link,
                })),
              },
            },
          },
        }
      );
      if (!create) throw new Error("Failed to create");
    } else if (id) {
      const findUserWithId = await prisma.user.findUnique({
        where: { id },
        include: { Student: { include: { projects: true } } },
      });
      const projectsToDisconnect = findUserWithId?.Student?.projects.filter((existingProject) => !projects.some((proj) => proj.ProjeectName === existingProject.ProjeectName));

      const update = await updateUser(
        { id: id ?? findUserWithId?.id },
        {
          Student: {
            update: {
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
            },
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
