let api_keys = require('../../keys');
let fetch = require('node-fetch');
module.exports.getEntropy = ()=>fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${api_keys.open_weather_api}`);