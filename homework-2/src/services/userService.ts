import {IUser, Data} from '../types';
import {userData} from '../dataAccess/userData';
import {ModelCtor, Op} from 'sequelize';
import {DataControl} from './dataService';

export class UserService extends DataControl<IUser> {
    constructor(model: ModelCtor<Data<IUser>>) {
        super(model);
    }

    public createUser(user: IUser) {
        const userDto = {...user};

        return this.model.create(userDto);
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

export const userService = new UserService(userData.model);
