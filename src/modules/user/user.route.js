import { Router } from 'express';
import { getAllUsers, getMe } from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const userRoute = Router();

userRoute.get('/', authMiddleware(), getMe);
userRoute.get('/users', authMiddleware(), getAllUsers);

export { userRoute };
