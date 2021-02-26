let api_keys = process.env.OPEN_WEATHER_API;
let fetch = require('node-fetch');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
async function getCities() {
    let city_list = await fs.readFile(path.join(__dirname, '../public/city.list.json'), 'utf8');
    return JSON.parse(city_list);
}
let cities;
let hash = crypto.createHash('sha256');
getCities().then(val => {
    let ids = val.map(city=>{ return {id:city.id, name:city.name} });
    return ids;
}).then(val=>cities=val);
let getEntropy = (bytes) => {
    let weather = [];
    for(let i = 0; i < bytes; ++i) {
        weather.push(fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cities[Math.floor(Math.random()*cities.length)].id}&appid=${api_keys}`));
    }
    return weather;
};
module.exports.handleRandomNumber = (req, res, next) => {
    if(req.params.bytes > 0 && req.params.bytes <= 8) {
        Promise.all(getEntropy(req.params.bytes)).then(val=>{
            let datajson = [];
            for(let json of val) {
                datajson.push(json.json());
            }
            Promise.all(datajson).then(response=>{
                let ans = [];
                for(let obj of response) {
                    hash.update(JSON.stringify(obj),'utf8');
                    ans.push(hash.copy().digest('hex'));
                }
                res.set('Content-Type', 'text/html');
                res.status(200).json(ans);
            });
        });
    } else 
    res.status(418).send('Out of Range.');
};