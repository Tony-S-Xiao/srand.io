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
    if(!Number.isInteger(req.params.num)) {
        res.send({error: "Must be integer."});
    }
    if(req.params.num <= 0 || req.params.num > 8) {
        res.send({error: "Out of range. Must be between 1 and 8."});
    }
    client.connect()
    .then( async ()=>{ 
        let sha2 = crypto.createHash('sha256');
        let sha3 = new Keccak(256);
        await client.query('begin;');
        let result_random_org = await client.query(`select * from random_org where status = 'good' limit 2;`);
        let result_drand = await client.query(`select * from random_org where status = 'good' limit 2;`);
        await client.query(`update random_org set status = 'served' where uid = $1`, [result_random_org.rows[0].uid]);
        await client.query(`update random_org set status = 'served' where uid = $1`, [result_random_org.rows[1].uid]);
        await client.query(`update drand set status = 'served' where uid = $1`, [result_drand.rows[0].uid]);
        await client.query(`update drand set status = 'served' where uid = $1`, [result_drand.rows[1].uid]);
        await client.query('commit;');
        sha2.update(result_random_org.rows[0].entropy);
        sha2.update(result_random_org.rows[1].entropy);
        sha3.update(result_random_org.rows[0].entropy);
        sha3.update(result_random_org.rows[1].entropy);
        client.end();
        res.send({randomNumber:[hashCombine(sha2.digest('utf8'), sha3.digest('utf8'))]});
    })
    .catch(err=>{throw(err)});
});
router.get('/', function(req, res, next) {
    res.render('index');
});
module.exports = router;