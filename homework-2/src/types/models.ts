import {Id} from './common';

export interface IUser {
    id: Id;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
