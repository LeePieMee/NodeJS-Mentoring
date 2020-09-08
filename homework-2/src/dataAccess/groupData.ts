import {groupModel} from '../models/group.model';
import {IUser, Data, Group} from '../types';
import {ModelCtor} from 'sequelize';
import {DataSource} from './dataSource';
import {DataControl} from './dataControl';

type GroupSchema = Data<Group>;

export const model = DataSource.sequelize.define<GroupSchema>('groups', groupModel, {
    freezeTableName: true,
    timestamps: false,
});

export class GroupData extends DataControl<GroupSchema> {
    constructor(model: ModelCtor<GroupSchema>) {
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

export const groupData = new GroupData(model);
