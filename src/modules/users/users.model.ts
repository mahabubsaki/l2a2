/* Model content */

import { model } from "mongoose";
import { IUser, IUserStatics, IOrder } from "./users.interface";
import { orderSchema, userMongooseSchema } from "./users.schema";


export const User = model<IUser, IUserStatics>('User', userMongooseSchema, 'users');
export const Order = model<IOrder>('Order', orderSchema, 'orders');