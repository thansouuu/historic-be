import { Router } from 'express';
import {
    forgotPassword,
    signin,
    signinGoogle,
    signup,
    update,
} from './auth.controller.js';

const authRoute = Router();

// đăng nhập
authRoute.post('/signin', signin);
authRoute.post('/signin-google', signinGoogle);

// đăng kí
authRoute.post('/signup', signup);

//cập nhật
authRoute.put('/update/:id', update);

authRoute.put('/forgotPassword', forgotPassword);
export { authRoute };
