const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);
    await prisma.user.create({
      data: {
        email: "test@test.com",
        password: hashedPassword,
        first_name: "Austin",
        last_name: "Smith",
        phone: "1234567890",
      }
    })
    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
