import {Sequelize, ModelOptions} from 'sequelize';
import {Data} from '../types';
import {ModelCtor} from 'sequelize';

export class DataSource<T> {
    model: ModelCtor<Data<T>>;

    constructor(name: string, model: Record<keyof T, any>, options: ModelOptions) {
        this.model = this.createModel(name, model, options);
    }

    private sequelize = new Sequelize(
        'postgres://sfblmsjr:o0V2WStfvTaP_H6ZO_k-gz4PJUX9cQ5d@lallah.db.elephantsql.com:5432/sfblmsjr',
    );

    private createModel(modelName: string, model: Record<keyof T, any>, options: ModelOptions): ModelCtor<Data<T>> {
        return this.sequelize.define<Data<T>>(modelName, model, options);
    }
}
