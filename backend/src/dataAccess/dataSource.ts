import {Sequelize, ModelOptions} from 'sequelize';
import {Data} from '../types';
import {ModelCtor} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export class DataSource<T> {
    model: ModelCtor<Data<T>>;

    constructor(name: string, model: Record<keyof T, any>, options: ModelOptions) {
        this.model = this.createModel(name, model, options);
    }

    private sequelize = new Sequelize(process.env.DB_CONNECT_STRING!);

    private createModel(modelName: string, model: Record<keyof T, any>, options: ModelOptions): ModelCtor<Data<T>> {
        return this.sequelize.define<Data<T>>(modelName, model, options);
    }
}
