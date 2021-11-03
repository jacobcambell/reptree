// MySQL Module to turn calls from the mysql package into promises
require('dotenv').config();

import * as mysql from 'mysql';
const con = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME
});

con.connect();

const query = (sql: string, params?: any[]) => {
    return new Promise<any>((resolve, reject) => {
        con.query(sql, params, (err, results) => {
            if (err) {
                reject(err)
                return;
            }

            resolve(results)
        })
    })
}

export { query }