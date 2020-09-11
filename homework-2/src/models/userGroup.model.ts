import {DataTypes} from 'sequelize';
import {groupData} from '../dataAccess/groupData';
import {userData} from '../dataAccess/userData';

export const userGroupModel = {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false},
    groupId: {
        type: DataTypes.BIGINT,
        references: {
            model: groupData,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.BIGINT,
        references: {
            model: userData,
            key: 'id',
        },
    },
};
