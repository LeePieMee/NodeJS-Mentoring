import jwt from 'jsonwebtoken';
import {IUser, Data} from '../types';
import {userData} from '../dataAccess/userData';
import {ModelCtor} from 'sequelize/types';

export class AuthService {
    private userModel: ModelCtor<Data<IUser>>;

    constructor(userModel: ModelCtor<Data<IUser>>) {
        this.userModel = userModel;
    }

    public async checkUserExist({login, password}: any) {
        return await this.userModel.findOne({where: {login, password}});
    }

    public generateAccessToken(login: string) {
        return jwt.sign({login}, 'secret', {expiresIn: '30m'});
    }
}

export const authService = new AuthService(userData.model);
