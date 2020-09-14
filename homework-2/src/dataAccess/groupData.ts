import {groupModel} from '../models/group.model';
import {Group} from '../types';
import {DataSource} from './dataSource';

export const groupData = new DataSource<Group>('groups', groupModel, {freezeTableName: true, timestamps: false});
