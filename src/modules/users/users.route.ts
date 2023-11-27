/* Route content */
import express from 'express';
import { validateOrder, validatePostUser, validateUpdateUser } from './users.middleware';
import { orderAddController, orderGetAllController, userDeleteSingleController, userGetAllController, userGetSingleController, userPostController, userUpdateSingleController } from './users.controller';
import { objectIdValidation } from '../../shared/objectIdValidation';

const userRouter = express.Router();

userRouter.post('/', validatePostUser, userPostController);
userRouter.get('/', userGetAllController);
userRouter.get('/:id', objectIdValidation, userGetSingleController);
userRouter.delete('/:id', objectIdValidation, userDeleteSingleController);
userRouter.put('/:id', objectIdValidation, validateUpdateUser, userUpdateSingleController);
userRouter.put('/:id/orders', objectIdValidation, validateOrder, orderAddController);
userRouter.get('/:id/orders', objectIdValidation, orderGetAllController);
userRouter.get('/:id/orders/total-price', objectIdValidation, orderGetAllController);
export default userRouter;