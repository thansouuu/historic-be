import { Router } from 'express';
import { userRoute } from '../modules/user/user.route.js';
import { authRoute } from '../modules/auth/auth.route.js';
import { feedbackRoute } from '../modules/feedback/feedback.route.js';
import { locationRoute } from '../modules/location/location.route.js';
import { likeRoute } from '../modules/like/like.route.js';

const routes = Router();

const apiRoutes = [
    {
        path: '/auth',
        entry: authRoute,
    },
    {
        path: '/me',
        entry: userRoute,
    },
    {
        path: '/feedback',
        entry: feedbackRoute,
    },
    {
        path: '/locations',
        entry: locationRoute,
    },
    {
        path: '/like',
        entry: likeRoute,
    },
];

apiRoutes.forEach((route) => {
    routes.use(route.path, route.entry);
});

export { routes };
