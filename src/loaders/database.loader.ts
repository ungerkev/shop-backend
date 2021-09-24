import { Service } from 'typedi';
import { Sequelize } from 'sequelize-typescript';
import {
 mysqlDatabase, mysqlHost, mysqlPassword, mysqlUser, mysqlPort,
} from '../configs/database.conf';
import { modelsDir } from '../configs/app.conf';

/**
 * Database connection class
 */
@Service()
export class DatabaseLoader {
    private _sequelizeObj: Sequelize;

    constructor() { }

    async connect(): Promise<void> {
        // Connect to MYSQL database
        const sequelize = new Sequelize({
            logging: false,
            define: {
                freezeTableName: true, // prevent sequelize from pluralizing table names
            },
            dialect: 'mysql',
            database: mysqlDatabase,
            username: mysqlUser,
            password: mysqlPassword,
            modelPaths: [modelsDir],
            host: mysqlHost,
            port: parseInt(mysqlPort, 10),
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });

        // Verify DB connection and sync models
        await sequelize.authenticate();
        console.log('Info: DatabaseLoader: DB authentication successfully');
        await sequelize.sync({ force: false });
        console.log('Info: DatabaseLoader: Connected to DB');
        this._sequelizeObj = sequelize;
        return Promise.resolve();
    }

    isAlive(): Promise<boolean> {
        return new Promise((resolve) => {
            console.log('DatabaseLoader: DB alive check');

            this._sequelizeObj.query('SELECT * FROM information_schema.columns LIMIT 1').then((result) => {
                if (result.length) {
                    console.log('Info: DatabaseLoader: DB connection alive');
                    resolve(true);
                } else {
                    console.log('Info: DatabaseLoader: DB connection not alive');
                    resolve(false);
                }
            }).catch(() => {
                console.log('Info: DatabaseLoader: DB connection query error');
                resolve(false);
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async query(sql: string): Promise<any> {
        const result = await this._sequelizeObj.query(sql);
        return result[0];
    }
}
