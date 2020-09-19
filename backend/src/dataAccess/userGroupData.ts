import {userGroupModel} from '../models/userGroup.model';
import {UserGroup} from '../types';
import {ModelOptions} from 'sequelize';
import {DataSource} from './dataSource';
import {groupData} from './groupData';
import {userData} from './userData';

export class UserGroupData extends DataSource<UserGroup> {
    constructor(name: string, model: Record<keyof UserGroup, any>, options: ModelOptions) {
        super(name, model, options);
        groupData.model.belongsToMany(userData.model, {through: this.model});
        userData.model.belongsToMany(groupData.model, {through: this.model});
    }
}

export const userGroupData = new UserGroupData('usergroups', userGroupModel, {
    freezeTableName: true,
    timestamps: false,
});
