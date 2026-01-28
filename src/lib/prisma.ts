import { PrismaClient } from '@prisma/client';
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter';

// 1. Create a secure HTTP connection (Firewall Safe)
const url = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production' && !url) {
  throw new Error('DATABASE_URL is missing in production environment. Please add it to your Netlify Site Settings.');
}

const adapter = new PrismaTiDBCloud({
  url: url || "mysql://root:password@localhost:4000/main"
});

// 3. Start Prisma
const prisma = new PrismaClient({ adapter });

export { prisma };