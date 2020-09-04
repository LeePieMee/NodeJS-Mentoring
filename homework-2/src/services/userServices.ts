import {IUser, Id} from '../types';
import {v4} from 'uuid';
import {UserData} from '../dataAccess/userData';
import {ErrorHandler} from '../helpers/ErrorHandler';

export class UserServices {
    public static async createUser(userData: IUser) {
        const userDto = {...userData, id: v4()};

        return await UserData.save(userDto);
    }

    /**
     * How I can use this for handle error in userController?
     */
    public static async getUserBy(id: Id): Promise<IUser> {
        const user = await UserData.get(id);

        if (!user) {
            throw new ErrorHandler(404, 'User not found');
        }

        return user;
    }

    public static async deleteUser(id: Id) {
        try {
            await UserData.delete(id);
        } catch (e) {
            throw new ErrorHandler(404, 'User with this id is not exist');
        }
    }

    public static async updateUser(userPayload: IUser) {
        try {
            await UserData.update(userPayload);
        } catch (e) {
            throw new ErrorHandler(404, `Can't delete user`);
        }
    }
}
