var express = require('express');
var router = express.Router();
let weather_handler = require('../controller/weatherController');
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  weather_handler.getEntropy().then((result)=>result.json()).then((result)=>res.send(result));
});

module.exports = router;