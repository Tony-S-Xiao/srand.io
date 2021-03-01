const express = require('express');
const router = express.Router();
const pg = require('pg');
const Keccak = require('sha3').Keccak;
const crypto = require('crypto');
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
        console.log(result_random_org);
        console.log(result_drand);
        sha2.update(result_random_org.rows[0].entropy);
        sha2.update(result_random_org.rows[1].entropy);
        sha3.update(result_random_org.rows[0].entropy);
        sha3.update(result_random_org.rows[1].entropy);
        res.send(hashCombine(sha2.digest('utf8'), sha3.digest('utf8')));
    })
    .catch(err=>{throw(err)});
});

/*
* Used to count the ratio of zeros/total bits. 
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
*/
const hashCombine = (random_0, random_1) => {
    let sha2 = crypto.createHash('sha256');
    let sha3 = new Keccak(256);
    sha2.update(random_0[0]);
    sha2.update(random_1[0]);
    sha3.update(random_0[1]);
    sha3.update(random_1[1]);
    let hash1 = sha2.digest().toString('hex');
    let hash2 = sha3.digest().toString('hex');
    return(xorHex(hash1, hash2));
};
const hexToBinary = (hex_letter) => {
    return parseInt(hex_letter, 16).toString(2).padStart(4,'0');
}
const binaryToHex = (binary_group_of_4) => {
    return parseInt(binary_group_of_4, 2).toString(16);
}
const xorBinary = (binary_string_0, binary_string_1) => {
    let output = [];
    for(let i = 0; i < binary_string_0.length; ++i) {
        output.push(binary_string_0.charAt(i) != binary_string_1.charAt(i) ? '1' : '0');
    }
    return output.join('');
}

const xorHex = (hex_string_0, hex_string_1) => {
    let binary_0 = [];
    let binary_1 = [];
    for(let i = 0; i < hex_string_0.length; ++i) {
        binary_0.push(hexToBinary(hex_string_0[i]));
        binary_1.push(hexToBinary(hex_string_1[i]));
    }
    let result_binary = xorBinary(binary_0.join(''), binary_1.join(''));
    
    let result_hex = [];
    for(let i = 0; i < result_binary.length; i+=4) {
        result_hex.push(binaryToHex(result_binary.substring(i, i+4)));
    }
    return result_hex.join('');
}
module.exports = router;