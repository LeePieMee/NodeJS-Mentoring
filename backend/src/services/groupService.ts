import {IUser, Data, Group} from '../types';
import {groupData} from '../dataAccess/groupData';
import {ModelCtor, Op} from 'sequelize/types';
import {DataControl} from './dataService';

export class GroupService extends DataControl<Group> {
    constructor(model: ModelCtor<Data<Group>>) {
        super(model);
    }

    public save(groupDto: Group) {
        return this.model.create({...groupDto});
    }

    public update(groupDto: IUser) {
        this.model.update(
            {...groupDto},
            {
                where: {
                    id: groupDto.id,
                },
            },
        );
    }

    public getAll() {
        return this.model.findAll();
    }

    public create(groupDto: Group) {
        return this.model.create({...groupDto});
    }
}

export const groupService = new GroupService(groupData.model);
