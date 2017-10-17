
const Teacher = require('../../base').Teacher
var express = require('express')
var router = express.Router();
var multiparty = require('multiparty')
var crypto = require('../crypto')

router.post('/',function(req, res, next){
    let form = new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
	Teacher.find({tel:fields.tel},(err,docs)=>{
	    if(!docs[0]){
		res.send({stat:false})
	    }else{
		if(docs[0].password==crypto(fields.password)){
		    res.send({
			stat:true,
			name:docs[0].name,
			tel:docs[0].tel,
			sess:docs[0]
		    })
		}else{
		    res.send({stat:false})
		}
	    }
	})

    })
})

module.exports=router
