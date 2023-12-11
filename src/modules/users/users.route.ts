/* Route content */
import express from 'express';
import { validateOrder, validatePostUser, validateUpdateUser } from './users.middleware';
import { orderAddController, orderGetAllController, totalPriceController, userDeleteSingleController, userGetAllController, userGetSingleController, userPostController, userUpdateSingleController } from './users.controller';


const userRouter = express.Router();

userRouter.post('/', validatePostUser, userPostController);
userRouter.get('/', userGetAllController);
userRouter.get('/:id', userGetSingleController);
userRouter.delete('/:id', userDeleteSingleController);
userRouter.put('/:id', validateUpdateUser, userUpdateSingleController);
userRouter.put('/:id/orders', validateOrder, orderAddController);
userRouter.get('/:id/orders', orderGetAllController);
userRouter.get('/:id/orders/total-price', totalPriceController);
export default userRouter;