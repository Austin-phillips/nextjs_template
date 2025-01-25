import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticatedUser } from '@/app/middlware/authMiddlware';
import { formatPhoneNumber } from '@/app/utils/helperFunctions';

// Define the schema for the expected data
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().length(12, "Phone must be exactly 10 digits"),
});

export async function POST(req: Request) {
  try {
    const userId = await authenticatedUser();
    const body = await req.json();
    // Validate the data using the schema
    const validatedData = userSchema.safeParse(body);
    if (!validatedData.success) {
      return Response.json({ errors: validatedData.error.flatten().fieldErrors }, { status: 400 });
    }
    const { firstName, lastName, phone } = validatedData.data;

    const formattedPhone = formatPhoneNumber(phone);  

    if (formattedPhone) {
      const phoneExists = await prisma.user.findUnique({
        where: {
          phone: formattedPhone
        },
        select: {
          id: true
        }
      });
      if (phoneExists && phoneExists.id !== userId) {
        return Response.json({ errors: { phone: 'Phone number already exists' } }, { status: 400 });
      }
    }

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: formattedPhone
      }
    })
    return Response.json({ message: 'Data is valid' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      return Response.json({ errors: error.errors }, { status: 400 });
    }
    if (error instanceof Error && error.message === "Unauthorized") {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // Handle other errors
    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

