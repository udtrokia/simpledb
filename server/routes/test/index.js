

var express = require('express');
var router = express.Router();


/* POST dataBase */

router.post('/', function(req, res, next){
    console.log('you post test!')
});


module.exports = router;
