/* Interface content */

import { Model, Types } from "mongoose";


export interface IUser {
    userId: number;
    username: string;
    password: string;
    fullName: {
        firstName: string;
        lastName: string;
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: {
        street: string;
        city: string;
        country: string;
    };
}

export interface IOrder {
    productName: string;
    price: number;
    quantity: number;
    userId: string;
}





export interface IUserMethods {
    demo: () => string;
}

export interface IUserStatics extends Model<IUser, object, IUserMethods> {
    demo: () => string;
    findUserById: (id: string, update: boolean) => Promise<Omit<IUser, 'password'>>;
}
