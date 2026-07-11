import { env } from '../env/index.js';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL || '' });
const prisma = new PrismaClient({ adapter, log: env.NODE_ENV === 'development' ? ['query', 'info'] : [] });

prisma.$connect().then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
});

export { prisma };