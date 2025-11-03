import "dotenv/config";
import { PrismaClient } from '@prisma/client';

// Initialise un client Prisma global pour éviter de multiples instances
// lors du "hot-reloading" en environnement de développement
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;