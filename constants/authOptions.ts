import { prisma } from "@/prisma/prisma-client";
import { AuthOptions, User } from "next-auth";
import { compare, hashSync } from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: String(findUser.id),
          username: findUser.username,
          fullName: findUser.fullName,
          email: findUser.email,
          role: findUser.role,
        } as User;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.role = token.role;
      return session;
    },

    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }
        if (!user.email) {
          return false;
        }
        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || "User #" + user.id,
            username: user.email,
            password: hashSync(user.id.toString(), 10),
            provider: account?.provider,
            providerId: account?.providerAccountId,
            role: "USER" as UserRole,
          },
        });

        return true;
      } catch (error) {
        console.error("[signIn]", error);
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.username = findUser.username;
        token.role = findUser.role;
      }

      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
