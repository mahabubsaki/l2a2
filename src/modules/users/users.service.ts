/* Service content */

import { IOrder, IUser } from "./users.interface";
import { Order, User } from "./users.model";



export const userPost = async (payload: IUser): Promise<Omit<IUser, 'password'>> => {
    const { password, ...result } = (await User.create(payload)).toObject();
    return result;
};

export const userGetAll = async (): Promise<Array<Pick<IUser, 'username' | 'fullName' | 'age' | 'email' | 'address'>>> => {
    const result = await User.find({}).select({ username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
};
export const userGetSingle = async (id: string): Promise<Omit<IUser, 'password'>> => {
    const result = await User.findUserById(id, false);
    return result;
};

export const userDeleteSingle = async (id: string): Promise<null> => {
    await User.findUserById(id, false);
    await User.deleteOne({ userId: id });
    return null;
};
export const userUpdateSingle = async (id: string, payload: Partial<IUser>): Promise<Omit<IUser, 'password'>> => {

    const existing = await User.findUserById(id, true);

    const updated = { ...existing, ...payload, fullName: { ...existing.fullName, ...(payload?.fullName || {}) }, address: { ...existing.address, ...(payload?.address || {}) } };
    const result = await User.findOneAndUpdate({ userId: id }, updated, { new: true });



    return result as IUser;
};


export const orderAdd = async (payload: IOrder): Promise<null> => {
    await User.findUserById(payload.userId, false);
    await Order.create(payload);
    return null;
};

export const orderGetAll = async (id: string): Promise<Array<Omit<IOrder, 'userId'>>> => {
    await User.findUserById(id, false);
    const result = await Order.find({ userId: id }, { price: 1, productName: 1, quantity: 1, _id: 0 });
    return result;
};

export const totalPrice = async (id: string): Promise<{ totalPrice: number; }> => {
    await User.findUserById(id, false);
    const result = await Order.aggregate([
        {
            $match: {
                userId: id
            }
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: { $multiply: ['$price', '$quantity'] } }
            }
        }
    ]);
    const totalPrice = result.length > 0 ? result[0].totalPrice : 0;
    return { totalPrice };
};