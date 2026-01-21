import { FastifyInstance } from 'fastify';
import { generateContent, analyzeJob, generateCoverLetter } from '../controllers/aiController';

export async function aiRoutes(app: FastifyInstance) {
    app.post('/ai/generate', generateContent);
    app.post('/ai/analyze-job', analyzeJob);
    app.post('/ai/generate-cover-letter', generateCoverLetter);
}
