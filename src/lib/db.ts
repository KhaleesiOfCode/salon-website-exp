import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) return undefined;
    const adapter = new PrismaNeon({ connectionString: url });
    return new PrismaClient({ adapter });
  } catch {
    return undefined;
  }
}

export const prisma = (globalForPrisma.prisma ?? createPrismaClient()) as PrismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
