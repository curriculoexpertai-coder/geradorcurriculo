const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function del() {
    const id = process.argv[2];
    if (!id) {
        console.log('Provide ID');
        return;
    }
    try {
        const result = await prisma.resume.delete({ where: { id } });
        console.log('Deleted:', result.id);
    } catch (e) {
        console.error('Error:', e.message);
    }
}

del().then(() => prisma.$disconnect());
