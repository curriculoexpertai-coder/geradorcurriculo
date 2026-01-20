import { FastifyInstance } from 'fastify';
import { saveResume, getResumes, getResumeById } from '../controllers/resumeController';

export async function resumeRoutes(app: FastifyInstance) {
    app.post('/resumes', saveResume);
    app.get('/users/:userId/resumes', getResumes);
    app.get('/resumes/:id', getResumeById);
}
