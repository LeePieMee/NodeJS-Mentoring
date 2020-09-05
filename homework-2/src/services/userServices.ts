import {IUser, Id} from '../types';
import {userData} from '../dataAccess/userData';

export class UserServices {
    public static async createUser(user: IUser) {
        const userDto = {...user};

        return await userData.save(userDto);
    }
}
