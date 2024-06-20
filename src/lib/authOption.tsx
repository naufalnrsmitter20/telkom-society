// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// import GoogleProvider from "next-auth/providers/google";

// export const authOption: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       type: "credentials",
//       name: "Credentials",
//       credentials: {
//         name: { label: "Name", type: "text", placeholder: "Name" },
//         email: { label: "Email", type: "email", placeholder: "Email" },
//         password: { label: "Password", type: "password", placeholder: "Password" },
//       },
//       async authorize(credentials: any) {
//         const data = {
//           email: credentials.email,
//           password: credentials.password,
//           type: "credentials",
//         };
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, user }: any) {
//       if (account?.provider === "credentials") {
//         token.email = user.email;
//         token.name = user.name;
//         token.role = user.role;
//       }
//       if (account?.provider === "google") {
//         const data = {
//           name: user.name,
//           email: user.email,
//           type: "google",
//         };
//         await loginWithGoogle(data, (result: { status: boolean; data: any }) => {
//           if (result.status) {
//             token.email = result.data.email;
//             token.name = result.data.name;
//             token.role = result.data.role;
//           }
//         });
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       if ("email" in token) {
//         session.user.email = token.email;
//       }
//       if ("name" in token) {
//         session.user.name = token.name;
//       }
//       if ("role" in token) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//     error: "/signin",
//   },
// };
