import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function saveResume(request: FastifyRequest, reply: FastifyReply) {
    const saveResumeSchema = z.object({
        userId: z.string(),
        resumeId: z.string().optional(),
        title: z.string().default('Meu Currículo'),
        data: z.any() // JSON structure from frontend
    });

    try {
        const { userId, resumeId, title, data } = saveResumeSchema.parse(request.body);

        let resume;

        if (resumeId) {
            // Update existing
            resume = await prisma.resume.update({
                where: { id: resumeId },
                data: {
                    structureData: data,
                    title,
                }
            });
        } else {
            // Create new
            resume = await prisma.resume.create({
                data: {
                    userId,
                    title,
                    templateId: 'default', // TODO: Make dynamic later
                    structureData: data,
                }
            });
        }

        reply.status(200).send(resume);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Validation error', issues: error.format() });
        }
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function getResumes(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as { userId: string };

    try {
        const resumes = await prisma.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' }
        });
        reply.status(200).send(resumes);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function getResumeById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const resume = await prisma.resume.findUnique({
            where: { id }
        });

        if (!resume) {
            return reply.status(404).send({ message: 'Resume not found' });
        }

        reply.status(200).send(resume);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}
