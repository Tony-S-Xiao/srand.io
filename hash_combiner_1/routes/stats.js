const express = require('express');
const router = express.Router;
const pg = require('pg');

router.get('/', async (req, res, next) => {
    let client = new pg.Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });
    await client.connect();

    await client.end();
});