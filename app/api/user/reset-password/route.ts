import { prisma } from "@/lib/prisma";
import { DateTime } from "luxon";

export async function POST(req: Request) {
  const body = await req.json();
  const expiresAt = DateTime.now().plus({ minutes: 30 }).toUnixInteger();
  const { email } = body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    }
  });

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 400 });
  }

  const code = Math.floor(100000 + Math.random() * 900000);

  const resetPassword = await prisma.resetPasswordToken.create({
    data: {
      email,
      token: code,
      expires_at: expiresAt,
    },
    select: {
      token: true,
    }
  });

  console.log(resetPassword.token);

  // TODO: Send code via Email
  return Response.json({ message: 'Data is valid' });
}