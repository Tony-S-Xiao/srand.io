const fetch = require("node-fetch");
const query = require('../db/postgres');
/* database schema
INDEX: 'time_index' on 'obtained'

uid serial primary key,
entropy varchar(64),
obtained timestamp INDEX: time_index,
status enum('good', 'served', 'expired')
*/
let body = JSON.stringify({
    jsonrpc: "2.0",
    method: "generateBlobs",
    params: {
        apiKey: process.env.RANDOM_ORG_API_KEY,
        n: 1,
        size: 256,
        format: "hex"
    },
    id: 123
})

const pollRandomOrg = (delay = 3*60*1000) => { // every 3 minutes
    setTimeout(()=>{
        fetch('https://api.random.org/json-rpc/2/invoke', { method: "POST", headers: { 'Content-Type': 'application/json' }, body: body})
        .then(response=>response.json())
        .then(res => {
            query('insert into random_org (entropy) values ($1);', [res.result.random.data[0]]);
            console.log(res.result.random.data[0]);
            pollRandomOrg(3*60*1000);
        });
    }, delay);
}
//{ "jsonrpc": "2.0", "method": "generateBlobs", "params": { "apiKey": "", "n": 100, "size": 512, "format": "hex" }, "id": 123 }
module.exports = pollRandomOrg;