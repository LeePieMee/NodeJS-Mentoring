import {Data, UserGroup} from '../types';
import {userGroupData} from '../dataAccess/userGroupData';
import {ModelCtor} from 'sequelize/types';
import {DataControl} from './dataService';

export class UserGroupService extends DataControl<UserGroup> {
    constructor(model: ModelCtor<Data<UserGroup>>) {
        super(model);

        this.model.sync({force: true});
    }

    public save(userGroupDto: UserGroup) {
        return this.model.create({...userGroupDto});
    }
}

export const userGroupService = new UserGroupService(userGroupData.model);
