import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextComment } from "@fuma-comment/server/next";
import { createPrismaAdapter } from "@fuma-comment/server/adapters/prisma";

const storage = createPrismaAdapter({
  db: prisma,
  auth: "next-auth",
});

export const { GET, DELETE, PATCH, POST } = NextComment({
  storage,
  auth: {
    async getSession() {
      const session = await auth();
      if (!session?.user?.email) return null;

      return {
        id: session.user.email,
      };
    },
  },
});
