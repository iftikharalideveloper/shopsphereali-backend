// prisma client instance
import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

//instance create
const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
});

// Gracefully Shutdown
process.on('beforeExit', async () =>{
    await prisma.$disconnect();
});

export default prisma;