/* Schema content */

import { Schema } from "mongoose";
import { z } from 'zod';
import { IUser, IUserMethods, IUserStatics } from "./users.interface";
import { ApiError } from "../../shared/ApiError";



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



userMongooseSchema.statics.findUserById = async function (id: string, update = false) {
    const exist = update ? await this.findById(id).lean() : await this.findById(id).select('-password').lean();

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
    email: z.string(),
    isActive: z.boolean().default(false),
    hobbies: z.array(z.string()),
    address: z.object({
        street: z.string(),
        city: z.string(),
        country: z.string(),
    }).strict(),
}).strict();
const userUpdateZodSchema = userZodSchema.deepPartial();
export {
    userMongooseSchema,
    userZodSchema,
    userUpdateZodSchema
}




