import { PrismaClient } from '@prisma/client';
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter';

// 1. Create a secure HTTP connection (Firewall Safe)
const adapter = new PrismaTiDBCloud({
  url: process.env.DATABASE_URL || "mysql://root:password@localhost:4000/main"
});

// 3. Start Prisma
const prisma = new PrismaClient({ adapter });

export { prisma };