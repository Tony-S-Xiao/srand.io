const express = require('express');
const router = express.Router();
const pg = require('pg');
const Keccak = require('sha3').Keccak;
const crypto = require('crypto');
const hashCombine = require('../helper/mycrypto').hashCombine;
router.get('/:num', (req, res, next) => {
    let client = new pg.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
    });
    if(!Number.isInteger(parseInt(req.params.num))) {
        res.send({error: "Must be integer."});
        return;
    }
    if(req.params.num <= 0 || req.params.num > 8) {
        res.send({error: "Out of range. Must be between 1 and 8."});
        return;
    }
    let result = { randomNumber:[] };
    client.connect()
    .then( async () => {
        await client.query('begin;');
        let result_random_org = await client.query(`select * from random_org where status = 'good' limit $1;`, [req.params.num * 2]);
        let result_drand = await client.query(`select * from drand where status = 'good' limit $1;`, [req.params.num * 2]);
        let random_org_uid = getAllUid(result_random_org.rows);
        let drand_uid = getAllUid(result_drand.rows);
        let parameter_pg = [];
        for(let i = 1; i <= random_org_uid.length; ++i) {
            parameter_pg.push('$'+i);
        }
        await client.query(`update random_org set status = 'served' where uid in (${parameter_pg.join(', ')});`, [...random_org_uid]);
        await client.query(`update drand set status = 'served' where uid in (${parameter_pg.join(', ')});`, [...drand_uid]);
        await client.query('commit;');
        for(let i = 0; i < result_random_org.rows.length; i+=2) {
            let sha2 = crypto.createHash('sha256');
            let sha3 = new Keccak(256);
            sha2.update(result_random_org.rows[i].entropy);
            sha2.update(result_random_org.rows[i+1].entropy);
            sha3.update(result_random_org.rows[i].entropy);
            sha3.update(result_random_org.rows[i+1].entropy);
            result.randomNumber.push(hashCombine(sha2.digest('utf8'), sha3.digest('utf8')));
        }
        client.end();
        res.json(result);
    })
    .catch(err=>{throw(err)});
});
let getAllUid = (rows) => {
    let result = [];
    for(let i = 0; i < rows.length; ++i) {
        result.push(rows[i].uid);
    }
    return result;
}
router.get("/", function(req, res, next) {
    res.status(400).json({error: "Unknown call. Please check the endpoint and parameters."});
});
module.exports = router;