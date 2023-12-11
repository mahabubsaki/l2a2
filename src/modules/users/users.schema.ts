/* Schema content */

import { Schema } from "mongoose";
import { z } from 'zod';
import { IOrder, IUser, IUserMethods, IUserStatics } from "./users.interface";
import { ApiError } from "../../shared/ApiError";
import bcrypt from 'bcrypt';


const userMongooseSchema = new Schema<IUser, IUserStatics, IUserMethods>({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    fullName: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    age: { type: Number },
    email: { type: String },
    isActive: { type: Boolean, default: false },
    hobbies: [{ type: String }],
    address: {
        street: { type: String },
        city: { type: String },
        country: { type: String },
    },
});

async function passwordHasher(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

userMongooseSchema.statics.findUserById = async function (id: string, update = false) {
    const exist = update ? await this.findOne({ userId: id }).lean() : await this.findOne({ userId: id }).select('-password').lean();


    if (!exist) {
        throw new ApiError(404, 'User not found with given id');
    }
    return exist;
};



const userZodSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }).strict(),
    age: z.number().nullable(),
    email: z.string().email({ message: "not a valid email" }),
    isActive: z.boolean().default(false),
    hobbies: z.array(z.string()),
    address: z.object({
        street: z.string(),
        city: z.string(),
        country: z.string(),
    }).strict(),
}).strict();


const userUpdateZodSchema = userZodSchema.deepPartial();


const orderZodSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
}).strict();

const orderSchema = new Schema<IOrder>({
    userId: { type: String, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});


userMongooseSchema.pre('save', async function (next) {
    try {


        this.password = await passwordHasher(this.password);

        next();
    } catch (error) {
        if (error instanceof Error) {
            next(error);
        }
    }
});


userMongooseSchema.pre('findOneAndUpdate', async function (next) {
    try {
        const update = this.getUpdate() as IUser;

        if (update.password) {

            update.password = await passwordHasher(update.password);
        }

        next();
    } catch (error) {
        if (error instanceof Error) {
            next(error);
        }
    }
});

export {
    userMongooseSchema,
    userZodSchema,
    userUpdateZodSchema,
    orderZodSchema,
    orderSchema
}




