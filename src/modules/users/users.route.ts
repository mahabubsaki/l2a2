/* Route content */
import express from 'express';
import { validateOrder, validatePostUser, validateUpdateUser } from './users.middleware';
import { userDeleteSingleController, userGetAllController, userGetSingleController, userPostController, userUpdateSingleController } from './users.controller';
import { objectIdValidation } from '../../shared/objectIdValidation';

const userRouter = express.Router();

userRouter.post('/', validatePostUser, userPostController);
userRouter.get('/', userGetAllController);
userRouter.get('/:id', objectIdValidation, userGetSingleController);
userRouter.delete('/:id', objectIdValidation, userDeleteSingleController);
userRouter.put('/:id', objectIdValidation, validateUpdateUser, userUpdateSingleController);
userRouter.put('/:id/orders', objectIdValidation, validateOrder,);
export default userRouter;