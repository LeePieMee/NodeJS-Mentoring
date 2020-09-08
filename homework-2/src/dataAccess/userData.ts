import {userModel} from '../models/user.model';
import {IUser, Data} from '../types';
import {Op, ModelCtor} from 'sequelize';
import {DataSource} from './dataSource';
import {DataControl} from './dataControl';

type UserSchema = Data<IUser>;

export const model = DataSource.sequelize.define<UserSchema>('users', userModel, {
    freezeTableName: true,
    timestamps: false,
});

export class UserData extends DataControl<UserSchema> {
    constructor(model: ModelCtor<UserSchema>) {
        super(model);
    }

    public save(userDto: IUser) {
        return this.model.create({...userDto});
    }

    public update(userDto: IUser) {
        this.model.update(
            {...userDto},
            {
                where: {
                    id: userDto.id,
                },
            },
        );
    }

    public searchUsers(login: string, limit: number) {
        return this.model.findAll({where: {login: {[Op.like]: `%${login}%`}}, limit});
    }
}

export const userData = new UserData(model);
