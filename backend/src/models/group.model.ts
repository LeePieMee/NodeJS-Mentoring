import {DataTypes} from 'sequelize';
import {Permissions} from '../types';

const permissions: Permissions[] = ['DELETE', 'READ', 'SHARE', 'UPLOAD_FILES', 'WRITE'];

export const groupModel = {
    id: {type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING(45), allowNull: false},
    permissions: {type: DataTypes.ARRAY(DataTypes.ENUM(...permissions)), allowNull: false},
};
