
const Teacher = require('../../base').Teacher
var express = require('express')
var router = express.Router();
var multiparty = require('multiparty')
var crypto = require('../crypto')

router.post('/',function(req, res, next){
    let form = new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
	fields.password = crypto(fields.password)
	let options = {
	    tel: fields.tel,
	    password: fields.password,
	    name:fields.name,
	}
	let teacher = new Teacher(options)
	Teacher.find({tel:fields.tel},(err,docs)=>{
	    if(docs.length==0){
		teacher.save((err,account)=>{
		    res.send({
                        stat:true,
                        name:fields.name,
                        tel:fields.tel,
                        sess:account
		    })
		})
	    }else{
		res.send({stat:false})
	    }
	})

    })
})

module.exports=router
