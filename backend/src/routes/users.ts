import { FastifyInstance } from 'fastify';
import { createUser, getUserProfile, updateProfile } from '../controllers/userController';

export async function userRoutes(app: FastifyInstance) {
    console.log('Registering User Routes...');
    app.post('/users', createUser);
    app.get('/users/:id', getUserProfile);
    app.put('/users/:id/profile', updateProfile);
    console.log('User Routes Registered.');
}
