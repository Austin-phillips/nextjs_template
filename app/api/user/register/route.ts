import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
import { formatPhoneNumber } from "@/app/utils/helperFunctions";
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().length(12, "Phone must be exactly 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  const body = await req.json();
  const validatedData = userSchema.safeParse(body);

  if (!validatedData.success) {
    return Response.json({ errors: validatedData.error.flatten().fieldErrors }, { status: 400 });
  }

  const { firstName, lastName, email, phone, password } = validatedData.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return Response.json({ errors: { email: "User already exists" } }, { status: 400 });
  }

  const formattedPhone = formatPhoneNumber(phone);

  const phoneExists = await prisma.user.findUnique({
    where: {
      phone: formattedPhone,
    },
    select: {
      id: true
    }
  });

  if (phoneExists) {
    return Response.json({ errors: { phone: "Phone number already exists" } }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: formattedPhone,
      password: hashedPassword,
    },
  });

  return Response.json({ message: "User registered successfully" });
}