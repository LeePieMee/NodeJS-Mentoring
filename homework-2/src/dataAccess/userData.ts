import {userModel} from '../models/user.model';
import {IUser} from '../types';
import {DataSource} from './dataSource';

export const userData = new DataSource<IUser>('users', userModel, {freezeTableName: true, timestamps: false});
