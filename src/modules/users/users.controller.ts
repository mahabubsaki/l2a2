/* Controller content */

import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { IUser } from "./users.interface";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import { orderAdd, orderGetAll, totalPrice, userDeleteSingle, userGetAll, userGetSingle, userPost, userUpdateSingle } from "./users.service";




export const userPostController = catchAsync(async (req: Request, res: Response) => {

    const userData: IUser = req.body;
    const result = await userPost(userData);
    sendResponse<Omit<IUser, 'password'>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User created successfully!"
    });
});

export const userGetAllController = catchAsync(async (_: Request, res: Response) => {


    const result = await userGetAll();
    sendResponse<Array<Pick<IUser, 'username' | 'fullName' | 'age' | 'email' | 'address'>>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Users fetched successfully!"
    });
});


export const userGetSingleController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userGetSingle(id);
    sendResponse<Omit<IUser, 'password'>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User fetched successfully!"
    });
});


export const userDeleteSingleController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await userDeleteSingle(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User deleted successfully!"
    });
});


export const userUpdateSingleController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const result = await userUpdateSingle(id, body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User updated successfully!"
    });
});



export const orderAddController = catchAsync(async (req: Request, res: Response) => {
    const body = { ...req.body, userId: req.params.id };
    const result = await orderAdd(body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Order created successfully!"
    });
});


export const orderGetAllController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await orderGetAll(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Order fetched successfully!"
    });
});
export const totalPriceController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await totalPrice(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Total price calculated successfully!"
    });
});