
const Renew = require('../base').Renew
var express = require('express')
var router = express.Router();
var multer = require('multer')()


router.post('/',multer.array(),function(req, res, next){
    console.log(req.body)
    let body = req.body
    let type=req.query.type
    if(type==='save'){
	let renew = new Renew(body)
	renew.save()
	res.send({stat:true})
    }else if(type==='find'){
	Renew.find(body,(err,docs)=>{
	    res.send(docs)
	})
    }else if(type==='update'){
	Renew.update({id:body.id},body,{upsert:true},(err,docs)=>{
	    res.send(docs)
	})
    }else if(type==='delete'){
	Renew.deleteOne({_id:_id},(err)=>{
	    res.send({stat:true})
	})
    }
})

module.exports=router
