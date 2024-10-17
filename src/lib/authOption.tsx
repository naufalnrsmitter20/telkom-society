import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import type { DefaultJWT } from "next-auth/jwt";
import client from "./prisma";
import { compareSync } from "bcrypt";
import { createUser, findUser, updateUser } from "@/utils/user.query";
import { revalidatePath } from "next/cache";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      email: string;
      password: string;
      name: string;
      role: string;
      image: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    image: string;
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: { maxAge: 60 * 60 * 24 * 7 },
  pages: {
    signIn: "/signin",
    error: "/AccessDenied",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Masukkan Email Anda",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Masukkan Password Anda",
        },
      },
      async authorize(credentials) {
        try {
          const findUser = await client.user.findUnique({
            where: {
              email: credentials?.email,
            },
            include: { userAuth: true },
          });

          if (!findUser) return null;

          const ComparePassword = compareSync(credentials?.password as string, findUser.userAuth?.password as string);
          if (!ComparePassword) return null;

          const user = {
            id: findUser.id,
            email: findUser.email,
            name: findUser.name,
            password: findUser.userAuth?.password,
            role: findUser.role,
            image: findUser.photo_profile,
          };
          return user;
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith("/") ? new URL(url, baseUrl).toString() : url;
    },
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          if (user.email) {
            return true;
          }
        }
        const match = user.email?.match(/\d+/);
        if (user.email) {
          const userDatabase = await findUser({ email: user.email });
          if (!userDatabase) {
            if (user.email.includes("smktelkom-mlg.sch.id")) {
              if (!user.email.includes("student")) {
                await createUser({
                  email: user.email,
                  photo_profile: user.image || "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png",
                  name: user.name || "",
                  Teacher: {
                    create: {
                      school: "SMK Telkom Malang",
                      subject: "Not Defined",
                    },
                  },
                  role: "GURU",
                  cover: "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png",
                  userAuth: {
                    create: {
                      last_login: new Date(),
                    },
                  },
                });
              } else {
                await createUser({
                  email: user.email,
                  photo_profile: user.image || "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png",
                  name: user.name || "",
                  Student: {
                    create: {
                      username: user.name || "",
                      generation: match ? match[0] : "0",
                      schoolOrigin: "SMK Telkom Malang",
                    },
                  },
                  role: "SISWA",
                  cover: "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png",
                  userAuth: {
                    create: {
                      last_login: new Date(),
                    },
                  },
                });
              }
            } else {
              if (user.email.includes("gmail.com")) {
                // sementara
                // await createUser({
                //   email: user.email,
                //   photo_profile: user.image || "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png",
                //   name: user.name || "",
                //   Teacher: {
                //     create: {
                //       school: "SMK Telkom Malang",
                //       subject: "Not Defined",
                //     },
                //   },
                //   role: "GURU",
                //   cover: "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png",
                //   userAuth: {
                //     create: {
                //       last_login: new Date(),
                //     },
                //   },
                // });

                await createUser({
                  email: user.email,
                  photo_profile: user.image || "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png",
                  name: user.name || "",
                  Student: {
                    create: {
                      username: user.name || "",
                      generation: match ? match[0] : "0",
                      schoolOrigin: "SMK Telkom Malang",
                    },
                  },
                  role: "SISWA",
                  cover: "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png",
                  userAuth: {
                    create: {
                      last_login: new Date(),
                    },
                  },
                });

                // sementara
              } else {
                await createUser({
                  email: user.email,
                  photo_profile: user.image || "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png",
                  name: user.name || "",
                  role: "GUEST",
                  cover: "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png",
                  userAuth: {
                    create: {
                      last_login: new Date(),
                    },
                  },
                });
              }
            }
            revalidatePath("/partner");
            revalidatePath("/division/create");
            revalidatePath("/api/data");
            revalidatePath("/");
            revalidatePath("/admin");
            revalidatePath("/isiIdentitas/personalData");
          }
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      try {
        if (user?.email) {
          const userDatabase = await findUser({ email: user.email });
          if (userDatabase) {
            token.email = userDatabase.email;
            token.id = userDatabase.id;
            token.role = userDatabase.role;
            token.picture = userDatabase.photo_profile;
          }
        }
        return token;
      } catch (error) {
        console.error("Error in jwt callback:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (token.email && session.user) {
          session.user.id = token.id;
          session.user.email = token.email || "";
          session.user.name = token.name || "";
          session.user.password = token.password || "";
          session.user.role = token.role || "SISWA";
          session.user.image = token.picture || "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png";
          await updateUser({ email: token.email }, { userAuth: { update: { last_login: new Date() } } });
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const nextGetServerSession = () => getServerSession(authOptions);
