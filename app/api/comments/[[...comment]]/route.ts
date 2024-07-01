import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextComment } from "@fuma-comment/next";
import { createAdapter } from "@fuma-comment/prisma-adapter";

const adapter = createAdapter({
  db: prisma,
  async getUsers(userIds) {
    const res = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        image: true,
      },
      where: {
        email: {
          in: userIds,
        },
      },
    });

    return res.map((user) => ({
      id: user.email,
      image: user.image ?? undefined,
      name: user.name ?? "Unknown User",
    }));
  },
});

export const { GET, DELETE, PATCH, POST } = NextComment({
  adapter,
  async getSession() {
    const session = await auth();
    if (!session?.user?.email) return null;

    return {
      id: session.user.email,
    };
  },
});
