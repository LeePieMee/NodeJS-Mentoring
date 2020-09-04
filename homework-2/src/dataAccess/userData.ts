import {userModel} from '../models/user.model';
import {IUser, Id, Data} from '../types';
import {Sequelize, Op} from 'sequelize';

type UserSchema = Data<IUser>;

export class DataSource {
    static sequelize = new Sequelize(
        'postgres://sfblmsjr:o0V2WStfvTaP_H6ZO_k-gz4PJUX9cQ5d@lallah.db.elephantsql.com:5432/sfblmsjr',
    );
}

export class UserData {
    static User = DataSource.sequelize.define<UserSchema>('users', userModel, {freezeTableName: true});

    public static save(userDto: IUser) {
        return UserData.User.create({...userDto});
    }

    public static delete(id: Id) {
        UserData.User.destroy({
            where: {
                id,
            },
        });
    }

    public static update(userDto: IUser) {
        UserData.User.update(
            {...userDto},
            {
                where: {
                    id: userDto.id,
                },
            },
        );
    }

    public static get(id: Id) {
        return UserData.User.findOne({where: {id}});
    }

    public static searchUsers(login: string, limit: number) {
        return UserData.User.findAll({where: {login: {[Op.like]: `%${login}%`}}, limit});
    }
}
