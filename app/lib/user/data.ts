"use server";

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
export async function getCurrentUser() {
  const session = await getServerSession();
  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    });
    return user;
  }
  return null;
}
