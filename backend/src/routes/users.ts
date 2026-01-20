import { FastifyInstance } from 'fastify';
import { createUser, getUserProfile } from '../controllers/userController';

export async function userRoutes(app: FastifyInstance) {
    console.log('Registering User Routes...');
    app.post('/users', createUser);
    app.get('/users/:id', getUserProfile);
    console.log('User Routes Registered.');
}
