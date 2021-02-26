const fetch = require('node-fetch');
const pg = require('pg');
const { response } = require('../app');

const Pool = pg.Pool;
console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});
const curr_pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

let query = (sql_statement, params) => {
    curr_pool.query(sql_statement, params, (err, result)=>{
        if(err) throw err;
    });
};

module.exports = query;