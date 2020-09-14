import {Sequelize} from 'sequelize';

export class DataSource {
    static sequelize = new Sequelize(
        'postgres://sfblmsjr:o0V2WStfvTaP_H6ZO_k-gz4PJUX9cQ5d@lallah.db.elephantsql.com:5432/sfblmsjr',
    );
}

export const dataSource = new DataSource();
