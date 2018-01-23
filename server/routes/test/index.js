

var express = require('express');
var router = express.Router();


/* POST dataBase */

router.post('*', function(req, res, next){
    console.log(req.path)
    res.send(req.path)
});


module.exports = router;
