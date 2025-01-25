import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const userToUpdate = await prisma.user.findUnique({ where: { email } });

  if (!userToUpdate) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  try {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    await prisma.resetPasswordToken.deleteMany({ where: { email } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
}