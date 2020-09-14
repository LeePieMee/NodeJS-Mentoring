import {v4} from 'uuid';
import {Model} from 'sequelize';

export interface ListQueryParams {
    limit: number;
    search: string;
}

export type Id = ReturnType<typeof v4>;

export type Data<T> = T & Model;
