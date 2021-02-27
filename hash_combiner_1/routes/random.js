const express = require('express');
const router = express.Router();
const pg = require('pg');
const Keccak = require('sha3').Keccak;

let total_zeros = 0;
let total_total = 0;

router.get('/:num', (req, res, next) => {
    let client = new pg.Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });
    client.connect()
    .then( async ()=>{
        await client.query('begin;');
        let result = await client.query(`select * from random_org where status = 'good' limit 1;`);
        console.log(result.rows);
        await client.query(`update random_org set status = 'served' where uid = $1`, [result.rows[0].uid]);
        await client.query('commit;');
        res.send(result.rows);
    })
    .catch(err=>{throw(err)});
});

const zeroRatio = (input) => {
    let zeros = 0;
    let total = 0;
    for(let i = 0; i < input.length; ++i) {
        if(input.charAt(i) == '0') {
            ++zeros;
            ++total_zeros;
        }
        ++total;
        ++total_total;
    }
    return zeros/total;
};

const hashCombine = (random_0, random_1) => {
    let sha2 = crypto.createHash('sha256');
    let sha3 = new Keccak(256);
    
};

module.exports = router;