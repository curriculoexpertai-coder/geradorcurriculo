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
