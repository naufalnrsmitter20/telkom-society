import { Prisma } from "@prisma/client";

export type userWithLastLogin = Prisma.UserGetPayload<{
  include: { userAuth: { select: { last_login: true } } };
}>;
export type userFullPayload = Prisma.UserGetPayload<{
  include: {
    userAuth: true;
    invitation: true;
    Team: { include: { team: { include: { member: { include: { user: { include: { Student: { include: { UserJob: true } } } } } } } }; user: true } };
    teamRequest: true;
    Student: {
      include: { certificates: true; projects: true; Skills: true; ClassOfTalent: true; UserJob: true };
    };
  };
}>;
export type userPayloadOne = Prisma.UserGetPayload<{}>;
export type userPayloadMany = Prisma.UserGetPayload<{ include: { Student: { include: { UserJob: true } } } }>[];
export type userWithStudentPayloadMany = Prisma.UserGetPayload<{ include: { Student: true } }>[];
export type userWithTeacherPayloadMany = Prisma.UserGetPayload<{ include: { Teacher: true } }>[];
export type userWithUserAuthMany = Prisma.UserGetPayload<{ include: { userAuth: true } }>[];
export type userWithUserAuthOne = Prisma.UserGetPayload<{ include: { userAuth: true } }>;
export type teamPayloadOne = Prisma.TeamGetPayload<{}>;
export type teamPayloadMany = Prisma.TeamGetPayload<{}>[];
export type jobPayloadMany = Prisma.UserJobGetPayload<{}>[];
export type classOfTalentPayloadMany = Prisma.ClassOfTalentGetPayload<{}>[];
export type teacherPayloadMany = Prisma.TeacherGetPayload<{ include: { user: true } }>[];
