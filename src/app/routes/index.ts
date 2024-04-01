import express from 'express';
import { userRoutes } from '../modules/User/user.routes'; 
import { AuthRoutes } from '../modules/Auth/auth.routes';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: userRoutes
    },
    {
        path: '/',
        route: AuthRoutes
    }, 

];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;