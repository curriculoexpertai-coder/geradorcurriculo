import { FastifyInstance } from 'fastify';
import { saveResume, getResumes, getResumeById, deleteResume, duplicateResume } from '../controllers/resumeController';

export async function resumeRoutes(app: FastifyInstance) {
    app.post('/resumes', saveResume);
    app.get('/users/:userId/resumes', getResumes);
    app.get('/resumes/:id', getResumeById);
    app.delete('/resumes/:id', deleteResume);
    app.post('/resumes/:id/duplicate', duplicateResume);
}
