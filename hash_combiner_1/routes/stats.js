const express = require('express');
const router = express.Router();
const pg = require('pg');
const hexToBinary = require('../helper/mycrypto').hexStringToBinaryString;
const zeroRatio = require('../helper/mycrypto').zeroRatio;

router.get('/', async (req, res, next) => {
    let client = new pg.Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });
    await client.connect();
    let random_org = await client.query('select entropy from random_org limit 10;');
    random_org = random_org.rows;
    let drand = await client.query('select entropy from random_org limit 10;');
    drand = drand.rows;
    let total_ratio = 0;
    for(let i = 0; i < 10; ++i) {
        total_ratio += zeroRatio(hexToBinary(drand[i].entropy)) + zeroRatio(hexToBinary(random_org[i].entropy));
    }
    client.end();
    res.send({ratio: total_ratio/20});
});

module.exports = router;