const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    await prisma.$executeRaw`DROP SCHEMA public CASCADE;`;
    await prisma.$executeRaw`CREATE SCHEMA public;`;
    console.log('Public schema dropped and recreated successfully.');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
