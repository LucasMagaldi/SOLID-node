import fastify from 'fastify';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';
import { env } from './env/index.js';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

export const app = fastify();
export const prisma = new PrismaClient({ adapter });
prisma.$connect().then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});