const fetch = require('node-fetch');
const query = require('../db/postgres');
/* database schema
INDEX: 'time_index' on 'obtained'

uid serial primary key,
entropy varchar(64),
obtained timestamp INDEX: time_index,
status enum('good', 'served', 'expired')
*/

const pollDrand = ()=>{
    let poll = setInterval(()=>{
        fetch('https://drand.cloudflare.com/public/latest')
        .then(res=>res.json())
        .then(result=>{
            query('INSERT INTO drand (entropy) values ($1)', [result.randomness]);
            console.log(result.randomness);
        })
        .catch(rej=>clearInterval(poll));
    }, 30000);
};

module.exports = pollDrand;