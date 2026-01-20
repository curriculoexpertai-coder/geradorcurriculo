import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';
import { userRoutes } from './routes/users';

dotenv.config();

const server: FastifyInstance = Fastify({
    logger: true
});

import { resumeRoutes } from './routes/resumes';
import { aiRoutes } from './routes/ai';

const start = async () => {
    try {
        await server.register(cors, {
            origin: true
        });

        await server.register(userRoutes);
        await server.register(resumeRoutes);
        await server.register(aiRoutes);

        server.get('/', async (request, reply) => {
            return { status: 'OK', message: 'CV.AI API is running', version: '0.1.0' };
        });

        server.get('/health', async (request, reply) => {
            try {
                const userCount = await prisma.user.count();
                return { status: 'UP', database: 'connected', users: userCount };
            } catch (error) {
                server.log.error(error);
                return reply.status(500).send({ status: 'DOWN', error: 'Database connection failed' });
            }
        });

        const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
        await server.listen({ port, host: '0.0.0.0' });
        console.log(`Server running on port ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
