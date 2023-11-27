/* Model content */

import { model } from "mongoose";
import { IUser, IUserStatics } from "./users.interface";
import { userMongooseSchema } from "./users.schema";


export const User = model<IUser, IUserStatics>('User', userMongooseSchema, 'users');