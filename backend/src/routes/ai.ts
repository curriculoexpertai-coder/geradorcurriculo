import { FastifyInstance } from 'fastify';
import { generateContent } from '../controllers/aiController';

export async function aiRoutes(app: FastifyInstance) {
    app.post('/ai/generate', generateContent);
}
