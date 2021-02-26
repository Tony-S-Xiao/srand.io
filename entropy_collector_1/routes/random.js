var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('random');
});
router.get('/:requested_bytes', function(req, res, next){
    res.send(req.params.requested_bytes);
});

module.exports = router;