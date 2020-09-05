import {userModel} from '../models/user.model';
import {IUser, Id, Data} from '../types';
import {Op, ModelCtor} from 'sequelize';
import {DataSource} from './dataSource';

type UserSchema = Data<IUser>;

const model = DataSource.sequelize.define<UserSchema>('users', userModel, {freezeTableName: true, timestamps: false});

export class UserData {
    private userModel: ModelCtor<UserSchema>;

    constructor(userModel: ModelCtor<UserSchema>) {
        this.userModel = userModel;
    }

    public save(userDto: IUser) {
        return this.userModel.create({...userDto});
    }

    public delete(id: Id) {
        this.userModel.destroy({
            where: {
                id,
            },
        });
    }

    public update(userDto: IUser) {
        this.userModel.update(
            {...userDto},
            {
                where: {
                    id: userDto.id,
                },
            },
        );
    }

    public get(id: Id) {
        return this.userModel.findOne({where: {id}});
    }

    public searchUsers(login: string, limit: number) {
        return this.userModel.findAll({where: {login: {[Op.like]: `%${login}%`}}, limit});
    }
}

export const userData = new UserData(model);
