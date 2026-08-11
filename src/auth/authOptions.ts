import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            roles: {
              include: {
                role: {
                  include: { permissions: { include: { permission: true } } },
                },
              },
            },
          },
        });
        if (!user) return null;

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        const permissions = Array.from(
          new Set(
            user.roles.flatMap((userRole) =>
              userRole.role.permissions.map((rp) => rp.permission.key),
            ),
          ),
        );
        const isAdmin = user.roles.some(
          (userRole) => userRole.role.name === "Owner",
        );

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          organizationId: user.organizationId,
          permissions,
          isAdmin,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.organizationId = user.organizationId;
        token.permissions = user.permissions;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.organizationId = token.organizationId as string;
      session.user.permissions = token.permissions ?? [];
      session.user.isAdmin = token.isAdmin ?? false;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
