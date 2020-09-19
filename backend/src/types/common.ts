import {Model} from 'sequelize';

export interface ListQueryParams {
    limit: number;
    search: string;
}

export type Data<T> = T & Model;
