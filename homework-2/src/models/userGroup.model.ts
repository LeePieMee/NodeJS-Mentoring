import {DataTypes} from 'sequelize';
import {model as Group} from '../dataAccess/groupData';
import {model as User} from '../dataAccess/userData';

export const userGroupModel = {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false},
    groupId: {
        type: DataTypes.BIGINT,
        references: {
            model: Group,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: User,
            key: 'id',
        },
    },
};
