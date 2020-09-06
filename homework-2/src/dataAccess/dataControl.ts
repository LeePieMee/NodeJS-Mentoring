import {Data} from '../types';
import {ModelCtor} from 'sequelize';

export class DataControl<T> {
    model: ModelCtor<Data<T>>;

    constructor(model: ModelCtor<Data<T>>) {
        this.model = model;
    }

    public get(id: string) {
        return this.model.findOne({where: {id}});
    }

    public delete(id: string) {
        return this.model.destroy({
            where: {id},
        });
    }
}
