import express from "express";
import userRouter from "../modules/users/users.route";


const router = express.Router();

const applicationRoutes = [
    { path: '/users', controller: userRouter },
];

applicationRoutes.forEach(route => {
    router.use(route.path, route.controller);
});

export default router;
