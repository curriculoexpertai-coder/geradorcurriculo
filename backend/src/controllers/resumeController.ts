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

        // Garantir que o usuário existe no banco de dados antes de salvar o currículo
        // Isso previne erros de chave estrangeira, especialmente no Modo Offline
        const userExists = await prisma.user.findUnique({ where: { id: userId } });

        if (!userExists) {
            console.log(`Usuário ${userId} não encontrado. Criando perfil básico para permitir o save.`);
            await prisma.user.create({
                data: {
                    id: userId,
                    email: userId.includes('admin') ? 'admin@teste.com' : `${userId}@placeholder.com`,
                    name: userId.includes('admin') ? 'Admin Local' : 'Usuário Temporário',
                    profile: { create: {} }
                }
            });
        }

        let resume;

        if (resumeId) {
            try {
                // Update existing
                resume = await prisma.resume.update({
                    where: { id: resumeId },
                    data: {
                        structureData: data,
                        title,
                    }
                });
            } catch (error: any) {
                if (error.code === 'P2025') {
                    return reply.status(404).send({ message: 'Currículo não encontrado (foi excluído)' });
                }
                throw error;
            }
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

export async function deleteResume(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        await prisma.resume.delete({
            where: { id }
        });
        reply.status(200).send({ message: 'Resume deleted successfully' });
    } catch (error: any) {
        // P2025 is Prisma's error for "Record not found"
        if (error.code === 'P2025') {
            return reply.status(200).send({ message: 'Resume already deleted' });
        }

        console.error(`Error deleting resume ${id}:`, error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function duplicateResume(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const original = await prisma.resume.findUnique({
            where: { id }
        });

        if (!original) {
            return reply.status(404).send({ message: 'Original resume not found' });
        }

        const duplicated = await prisma.resume.create({
            data: {
                userId: original.userId,
                title: `${original.title} (Cópia)`,
                templateId: original.templateId,
                structureData: original.structureData as any,
            }
        });

        reply.status(201).send(duplicated);
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

