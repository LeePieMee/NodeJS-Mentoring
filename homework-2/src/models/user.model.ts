import {DataTypes} from 'sequelize';

export const userModel = {
    id: {type: DataTypes.UUID, primaryKey: true, allowNull: false},
    login: {type: DataTypes.STRING(25), allowNull: false},
    password: {type: DataTypes.STRING(15), allowNull: false},
    isDeleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    age: {type: DataTypes.INTEGER, allowNull: false},
};
