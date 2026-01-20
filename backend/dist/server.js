"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = (0, fastify_1.default)({
    logger: true
});
server.register(cors_1.default, {
    origin: true // Em produção, mude para o domínio do frontend
});
server.get('/', async (request, reply) => {
    return { status: 'OK', message: 'CV.AI API is running', version: '0.1.0' };
});
const prisma_1 = require("./lib/prisma");
server.get('/health', async (request, reply) => {
    try {
        const userCount = await prisma_1.prisma.user.count();
        return { status: 'UP', database: 'connected', users: userCount };
    }
    catch (error) {
        server.log.error(error);
        return reply.status(500).send({ status: 'DOWN', error: 'Database connection failed' });
    }
});
const start = async () => {
    try {
        const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
        await server.listen({ port, host: '0.0.0.0' });
        console.log(`Server running on port ${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
