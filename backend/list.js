const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function list() {
    const resumes = await prisma.resume.findMany({
        select: { id: true, title: true }
    });
    console.log(JSON.stringify(resumes, null, 2));
}

list().then(() => prisma.$disconnect());
