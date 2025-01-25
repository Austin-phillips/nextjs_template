import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, password } = await req.json();
  const validatedData = userSchema.parse({ firstName, lastName, email, phone, password });

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (existingUser) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  await prisma.user.create({
    data: {
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      password: hashedPassword,
    },
  });

  return Response.json({ message: "User registered successfully" });
}