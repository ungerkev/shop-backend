/**
 * Database connection variables
 */
 if (!process.env.MYSQL_DB
    || !process.env.MYSQL_USER
    || !process.env.MYSQL_PASSWORD
    || !process.env.MYSQL_HOST
    || !process.env.MYSQL_PORT) {
    throw new Error('Invalid database configuration');
    }

 export const mysqlDatabase = process.env.MYSQL_DB;
 export const mysqlUser = process.env.MYSQL_USER;
 export const mysqlPassword = process.env.MYSQL_PASSWORD;
 export const mysqlHost = process.env.MYSQL_HOST;
 export const mysqlPort = process.env.MYSQL_PORT;
