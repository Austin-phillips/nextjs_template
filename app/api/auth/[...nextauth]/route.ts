import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signOut } from "next-auth/react";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            email: true,
            password: true,
          }
        });

        if (!user || !credentials?.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        const userWithoutPassword = {
          ...user,
          password: undefined,
        };

        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger }: { token: any; trigger?: string; }) {
      if (trigger === "signIn" || trigger === "update") {
        const user = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
          select: {
            email: true,
          }
        });

        if (user) {
          token.email = user.email;
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session.user.email = token.email;
      }

      return session;
    },
  },
  pages: {
    signOut: "/",
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
