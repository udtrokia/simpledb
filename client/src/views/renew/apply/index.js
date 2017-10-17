import React,{Component} from 'react';
import {
    Col,
    Card,
    Button,
    Row,
    CardHeader,
    Label,
    CardBody,
    CardFooter,
} from 'reactstrap';

import $ from 'jquery'
export default class Example extends Component{
    constructor(props){
	super(props)
	this.state={
	    applyList:''
	}
    }
    componentWillMount(){
	this.getList()
    }
    getList=()=>{
	$.post(URL+'/db?type=find&col=student',{apply:true},(arr)=>{
            this.setState({applyList:arr})
        })
    }
    click=(detail,click)=>{
	if(click==="agree"){
	    let fee = Number(detail.money)+Number(detail.totalAmount)
	    $.post(
		URL+'/db?type=update&col=student',
		{_id:detail._id,end:detail.to,totalAmount:fee,apply:false},(res)=>{
		    if(res){
			this.updateRenew(detail)			
			alert("更新缴费信息成功！")
		    }else{
			alert('更新失败, 请联系管理人员')
		    }
		    this.getList()
		})
	}else if(click==="ignore"){
	    $.post(
		URL+'/db?type=update&col=student',
		{tel:detail.tel,apply:false},(res)=>{
		    if(res){
			alert("已忽略该申请,如需缴费请再次申请")
		    }else{
			alert('操作失败, 请联系管理人员')
		    }
		    this.getList()
		})	    
	}
    }
    updateRenew=(detail)=>{
	let date = new Date()
	let data = {}
	data['id']= detail._id
	data['name'] = detail.name
	let arr = []
	$.post(URL+'/renew?type=find',{id:detail._id},(res)=>{
	    if(res.length!==0){
		arr = res[0]['record']
	    }
	    let obj = {}
	    obj[date]= detail.money
	    obj['applyAccount']=detail.applyAccount
	    obj['end']=detail.end
	    obj['totalAmount']=detail.totalAmount
	    arr.push(JSON.stringify(obj))
	    data['record']=arr
	    $.post(URL+'/renew?type=update',data)
	})
    }
    renderList=(lists)=>{
	if(lists.length>0){
	    const listItems = lists.map((value,key)=>{
		return(
			<Col sm='12' key={key} className="mt-3">
			<Card>
			<CardHeader >{value.region}</CardHeader>
			<CardBody>
			<Row><Col >
			<Label>学生电话: {value.tel}</Label>
			</Col></Row>		    		    
			<Row><Col>
			<Label>姓名: {value.name}</Label>
			</Col>		    
			<Col >
			<Label>缴费金额: {value.money}元</Label>
			</Col></Row>
			<Row><Col >
			<Label>缴费至: {value.to}</Label>
			</Col>
			<Col >
			<Label>申请人: {value.applyAccount}</Label>
			</Col></Row>
			</CardBody>
    			
			<CardFooter style={{backgroundColor:'#fff'}} className="text-right">
			<Button
		    className="mr-3"
		    onClick={()=>{this.click(value,"agree")}}>同意</Button>
			<Button
		    onClick={()=>{this.click(value,"ignore")}}>忽略</Button>
			</CardFooter>
			</Card>
			</Col>
		)
	    })
	    return <div>{listItems}</div>
	}else{
	    return <Col tag="h5" className="mt-3">暂无缴费申请...</Col>
	}
    }
    render(){
	return (
		<div className=" pb-5">
		{this.renderList(this.state.applyList)}
	    </div>
	)
    }
};


