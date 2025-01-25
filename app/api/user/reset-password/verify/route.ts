import { prisma } from "@/lib/prisma";
import { DateTime } from "luxon";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, code } = body;
  const parsedCode = Number(code);

  if (!email || !parsedCode) {
    return Response.json({ message: 'Invalid request' }, { status: 400 });
  }

  const codeExists = await prisma.resetPasswordToken.findFirst({
    where: {
      email,
      token: parsedCode,
    },
    select: {
      expires_at: true,
    }
  });

  if (!codeExists || codeExists.expires_at < DateTime.now().toUnixInteger()) {
    return Response.json({ message: 'Invalid code' }, { status: 400 });
  }

  return Response.json({ message: 'Data is valid' });
}