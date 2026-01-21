import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBody = z.object({
        id: z.string(), // UID do Firebase
        email: z.string().email(),
        name: z.string().optional(),
    });

    try {
        const { id, email, name } = createUserBody.parse(request.body);

        // Verifica se o usuário já existe
        let user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            // Cria usuário e perfil vazio
            user = await prisma.user.create({
                data: {
                    id,
                    email,
                    name,
                    profile: {
                        create: {} // Cria perfil vazio automaticamente
                    }
                },
            });
            reply.status(201).send(user);
        } else {
            // Se já existe, apenas retorna (idempotente)
            reply.status(200).send(user);
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Validation error', issues: error.format() });
        }
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                profile: {
                    include: {
                        experiences: true,
                        educations: true,
                    }
                },
                resumes: {
                    select: {
                        id: true,
                        title: true,
                        updatedAt: true,
                    }
                }
            }
        });

        if (!user) {
            return reply.status(404).send({ message: 'User not found' });
        }

        return reply.status(200).send(user);

    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}

export async function updateProfile(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    const updateProfileBody = z.object({
        bio: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
        linkedinUrl: z.string().optional(),
        portfolioUrl: z.string().optional(),
        experiences: z.array(z.object({
            id: z.string().optional(),
            title: z.string(),
            company: z.string(),
            location: z.string().optional(),
            startDate: z.string().transform((val) => new Date(val)),
            endDate: z.string().optional().transform((val) => val ? new Date(val) : null),
            currentJob: z.boolean().default(false),
            description: z.string().optional(),
        })).optional(),
        educations: z.array(z.object({
            id: z.string().optional(),
            school: z.string(),
            degree: z.string(),
            fieldOfStudy: z.string().optional(),
            startDate: z.string().transform((val) => new Date(val)),
            endDate: z.string().optional().transform((val) => val ? new Date(val) : null),
            description: z.string().optional(),
        })).optional(),
    });

    try {
        const data = updateProfileBody.parse(request.body);

        // Primeiro, garantimos que o perfil existe
        const profile = await prisma.profile.findUnique({
            where: { userId: id }
        });

        if (!profile) {
            return reply.status(404).send({ message: 'Profile not found' });
        }

        // Atualização atômica usando transação
        await prisma.$transaction(async (tx) => {
            // 1. Atualiza campos básicos do perfil
            await tx.profile.update({
                where: { userId: id },
                data: {
                    bio: data.bio,
                    phone: data.phone,
                    location: data.location,
                    linkedinUrl: data.linkedinUrl,
                    portfolioUrl: data.portfolioUrl,
                }
            });

            // 2. Se experiências foram enviadas, limpamos e re-criamos (simplificação)
            // Ou atualizamos se tiver ID. Para o MVP, vamos deletar as antigas e criar as novas.
            if (data.experiences) {
                await tx.experience.deleteMany({ where: { profileId: profile.id } });
                await tx.experience.createMany({
                    data: data.experiences.map(exp => ({
                        ...exp,
                        profileId: profile.id
                    }))
                });
            }

            // 3. Mesma lógica para educação
            if (data.educations) {
                await tx.education.deleteMany({ where: { profileId: profile.id } });
                await tx.education.createMany({
                    data: data.educations.map(edu => ({
                        ...edu,
                        profileId: profile.id
                    }))
                });
            }
        });

        return reply.status(200).send({ message: 'Profile updated successfully' });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return reply.status(400).send({ message: 'Validation error', issues: error.format() });
        }
        console.error(error);
        reply.status(500).send({ message: 'Internal server error' });
    }
}
