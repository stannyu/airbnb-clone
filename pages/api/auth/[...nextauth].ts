import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import NextAuth, { AuthOptions } from "next-auth";
import  GithubProvider from "next-auth/providers/github";
import  GoogleProvider from "next-auth/providers/google";
import CredentialsProvicder from "next-auth/providers/credentials";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvicder({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password"}
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          throw new Error("Email or password is empty")
        };

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user.hashedPassword) {
          throw new Error("User not found")
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword)

        if(!isValid) {
          throw new Error("Invalid password")
        }

        console.log('user', user);

        return user;
      }
    })
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
}

export default NextAuth(authOptions);