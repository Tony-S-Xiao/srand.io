var express = require('express');
var router = express.Router();
let path = require('path');
let weather_handler = require(path.join(__dirname, '../controller/weatherController'));
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('../views/index');
});
router.get('/p=:bytes', weather_handler.handleRandomNumber);
module.exports = router;