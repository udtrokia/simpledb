
const Teacher = require('../../base').Teacher
var express = require('express')
var router = express.Router();
var multiparty = require('multiparty')

router.post('/',function(req, res, next){
    let form = new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
	Teacher.find(req.body,(err,docs)=>{
	    res.send(docs)
	})

    })
})

module.exports=router
