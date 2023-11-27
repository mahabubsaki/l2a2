/* Service content */

import { IUser, Order } from "./users.interface";
import { User } from "./users.model";


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
    await User.findByIdAndDelete(id);
    return null;
};
export const userUpdateSingle = async (id: string, payload: Partial<IUser>): Promise<Omit<IUser, 'password'>> => {

    const existing = await User.findUserById(id, true);

    const updated = { ...existing, ...payload, fullName: { ...existing.fullName, ...(payload?.fullName || {}), address: { ...existing.address, ...(payload?.address || {}) } } };
    const { password, ...result } = await User.findByIdAndUpdate(id, updated, { new: true }).lean() as IUser;

    return result;
};


export const orderAdd = async (payload: Order): Promise<null> => {
    await User.findUserById(id, false);
    await User.findByIdAndDelete(id);
    return null;
};