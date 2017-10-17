
const Teacher = require('../../base').Teacher
var express = require('express')
var router = express.Router();
var multer = require('multer')
var crypto = require('../crypto')

function ct(arr, obj) {
    var i = arr.length;
    while (i--) {
	if (arr[i] === obj) {
	    return true;
	}
    }
    return false;
}
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let dest = PUBLIC+'teacherAvatar'
        cb(null,dest)
    },
    filename:(req,file,cb)=>{
        req.body['avatar']=req.query.avatar
        let name=req.query.avatar
        cb(null,name)
    }
})
var upload= multer({storage:storage})

router.post('/',upload.single('Avatar'),function(req, res, next){
    let body = req.body
    if(body.auth){
	body['region']=[]
	console.log(body)
	let body_keys=Object.keys(body)
	if(ct(body_keys,'dealManager')){
	    body.dealManager= true
	}else{body['dealManager']=false}	
	if(ct(body_keys,'dealTeacher')){
	    body.dealTeacher= true
	}else{body['dealTeacher']=false}
	if(ct(body_keys,'dealRenew')){
	    body.dealRenew= true
	}else{body['dealRenew']=false}
	let regionArr = ['校区一','校区二','校区三','校区四','校区五','校区六']
	for(var n in regionArr){
	    if(ct(body_keys,regionArr[n])){
		body.region.push(regionArr[n])
	    }	
	}
	Teacher.update({_id:body._id},body,{multi:true},(err)=>{
	    res.send({stat:true})
	})
    }else{
	console.log('not auth')
	res.send({stat:false})
    }
})

module.exports=router
