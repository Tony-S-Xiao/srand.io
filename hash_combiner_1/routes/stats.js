const express = require('express');
const router = express.Router();
const pg = require('pg');
const hexToBinary = require('../helper/mycrypto').hexStringToBinaryString;
const zeroRatio = require('../helper/mycrypto').zeroRatio;
const hexCharto4Binary = require('../helper/mycrypto').hexToBinary;

router.get('/zero-percentage/:hours', async (req, res, next) => {
    let client = new pg.Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });
    if(!Number.isInteger(parseInt(req.params.hours)) || req.params.hours <= 0 || req.params.hours > 24) {
        res.status(400).json({error: "Must be an integer between 1 and 24."});
    } else {
        await client.connect();
        let random_org = await client.query(`select entropy from random_org where obtained >= now() - interval ${`'` + req.params.hours + ` hour'`};`);
        random_org = random_org.rows.map((val)=>val.entropy).join('');
        let drand = await client.query(`select entropy from drand where obtained >= now() - interval ${`'` + req.params.hours + ` hour'`};`);
        drand = drand.rows.map((val)=>val.entropy).join('');
        let total_ratio = 0;
        for(let i = 0; i < random_org.length; ++i) {
            total_ratio += zeroRatio(hexToBinary(drand[i])) + zeroRatio(hexToBinary(random_org[i]));
        }
        client.end();
        res.json({percentage: total_ratio/(2*random_org.length)});
    }
});
router.get('/zero-runs/:hours', async (req, res, next) => {
    let client = new pg.Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });
    if(!Number.isInteger(parseInt(req.params.hours)) || req.params.hours <= 0 || req.params.hours > 24) {
        res.status(400).json({error: "Must be an integer between 1 and 24."});
    } else {
        await client.connect();
        let random_org = await client.query(`select entropy from random_org where obtained >= now() - interval ${`'` + req.params.hours + ` hour'`};`);
        random_org = random_org.rows.map((val)=>val.entropy).join('');
        let drand = await client.query(`select entropy from drand where obtained >= now() - interval ${`'` + req.params.hours + ` hour'`};`);
        drand = drand.rows.map((val)=>val.entropy).join('');
        random_org = Array.from(countLongestRunOfZeros(random_org + drand), ([key, value]) => {return {runLength: key, runCount: value}});
        random_org.sort((a, b) => a.runLength-b.runLength);
        random_org.shift();
        client.end();
        res.json({consecZeros: random_org});
    }
});
router.get('/', function(req, res, next) {
    res.status(400).send({error: "Unknown call. Please check the endpoint and parameters."});
});
let countLongestRunOfZeros = (concat_hash) => {
    let hash_table = new Map();
    let curr_zero_run = 0;
    for(let i = 0; i < concat_hash.length; ++i) {
        let curr_bin = hexCharto4Binary(concat_hash[i]);
        for(let j = 0; j < curr_bin.length; ++j) {
            if(curr_bin[j] === '0') curr_zero_run++;
            else {
                if(hash_table.has(curr_zero_run)) {
                    hash_table.set(curr_zero_run, hash_table.get(curr_zero_run) + 1);
                } else {
                    hash_table.set(curr_zero_run, 1);
                }
                curr_zero_run = 0;
            }
        }
    }
    //console.log(wow.join(''));
    return hash_table;
}
module.exports = router;