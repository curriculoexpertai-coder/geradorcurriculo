import { prisma } from './lib/prisma';

async function main() {
    console.log('Testing database connection (Prisma 5)...');
    try {
        const userCount = await prisma.user.count();
        console.log(`✅ SUCCESS! Connected via Prisma 5. Users: ${userCount}`);
    } catch (error) {
        console.error('❌ FAILED:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
