import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      organizationId: string;
      permissions: string[];
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    organizationId: string;
    permissions: string[];
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    organizationId?: string;
    permissions?: string[];
    isAdmin?: boolean;
  }
}
