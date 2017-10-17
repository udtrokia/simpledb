
//DB_BASE_API
const mongoose = require('mongoose')
var express = require('express');
var router = express.Router();
var multer = require('multer')

//UPLOAD_AVATAR
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
	let dest = PUBLIC+req.query.col+'Avatar'
	cb(null,dest)
    },
    filename:(req,file,cb)=>{
	req.body['avatar']=req.query.avatar
	let name=req.query.avatar
	cb(null,name)
    }
})
var upload= multer({storage:storage})

//DB_MODEL
const Teacher = require('../base').Teacher
const Student = require('../base').Student

//POST_DATA_BASE 
router.post('/',upload.single('Avatar'),function(req, res, next){
    
    let body = req.body
    let type = req.query.type
    let col = req.query.col
    let Model
    col=="student"?Model=Student:Model=Teacher
    if(type=="save"){	
	let model = new Model(body)
	model.save((err)=>{
	    if(err){
		console.log(err)
		res.send({stat:false})
	    }else{
		res.send({stat:true})
	    }
	})

    }else if(type=="find"){
	if(typeof(body.region)==='object'){
	    body.region= {$in:body.region}
	}
	Model.find(body,(err,docs)=>{
	    res.send(docs)
	}).sort({region:1,_class:1,name:1})
    }else if(type=='update'){
	Model.update({_id:body._id},body,{multi:true},(err,docs)=>{
	    if(err){
		res.send({stat:false})
	    }else{
		res.send(body)
	    }
	})
    }else if(type=="delete"){
	let _id = body._id
	Model.deleteOne({_id:_id},(err)=>{
	    if(err){
		res.send({stat:false})
	    }else{
		res.send({stat:true})
	    }
	})
    }
});


module.exports = router;
