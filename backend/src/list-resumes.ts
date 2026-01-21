import { prisma } from './lib/prisma';

async function list() {
    const resumes = await prisma.resume.findMany();
    console.log('Resumes found:', resumes.length);
    resumes.forEach(r => console.log(`ID: ${r.id}, Title: ${r.title}`));
}

list().then(() => process.exit(0));
