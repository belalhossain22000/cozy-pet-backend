import express from 'express';
import { userRoutes } from '../modules/User/user.routes'; 
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { petRoutes } from '../modules/pet/pet.route';


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
    {
        path: '/',
        route: petRoutes
    }, 

];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;