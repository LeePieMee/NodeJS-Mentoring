import {userGroupModel} from '../models/userGroup.model';
import {UserGroup, Data} from '../types';
import {ModelCtor} from 'sequelize';
import {DataSource} from './dataSource';
import {DataControl} from './dataControl';
import {model as GroupModel} from './groupData';
import {model as UserModel} from './userData';

type UserGroupSchema = Data<UserGroup>;

export const model = DataSource.sequelize.define<UserGroupSchema>('usergroups', userGroupModel, {
    freezeTableName: true,
    timestamps: false,
});

export class UserGroupData extends DataControl<UserGroupSchema> {
    constructor(model: ModelCtor<UserGroupSchema>) {
        super(model);
        GroupModel.belongsToMany(UserModel, {through: this.model});
        UserModel.belongsToMany(GroupModel, {through: this.model});
    }

    public save(userGroupDto: UserGroup) {
        return this.model.create({...userGroupDto});
    }
}

export const userGroupData = new UserGroupData(model);
