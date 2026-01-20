const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    console.log('Attempting to connect to database...');
    try {
        await prisma.$connect();
        const userCount = await prisma.user.count();
        console.log(`SUCCESS: Connected! Found ${userCount} users.`);
    } catch (e) {
        console.error('ERROR: Could not connect.', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
