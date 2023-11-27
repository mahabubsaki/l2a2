/* Middleware content */

import { RequestHandler } from "express";
import { userUpdateZodSchema, userZodSchema } from "./users.schema";


export const validatePostUser: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await userZodSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};


export const validateUpdateUser: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await userUpdateZodSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
