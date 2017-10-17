//detail

import React, { Component } from 'react';
import {
    Container,
    Form,
    Input,
    Col,
    ButtonGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Label
} from 'reactstrap'

//check
import {
    checkDate,
    checkNumber
} from '../list/utils'

//history
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
//sess
let sess = JSON.parse(sessionStorage.getItem('stat'))

//jquery
const $ = require('jquery')
export default class Detail extends Component {
    constructor(props){
	super(props)
	this.state={
	    tel:this.props.location.state.detail.tel,
	    _id:this.props.location.state.detail._id
	}
    }	
    apply=()=>{
	let to = $('#to')[0].value
	let money= $('#money')[0].value
	if(checkDate(to)&&checkNumber(money)){
            let data = new FormData($('#form')[0])
	    data.append('apply',true)
	    data.append('_id',this.state._id)
	    data.append('applyAccount',sess.name)
            $.ajax({
		type:"POST",
		url:URL+'/db?type=update&col=student',
		data:data,
		dataType:'JSON',
		processData:false,
		contentType:false,
		success:()=>{
                    alert('申请成功，请与财务人员进行联系！')
		    history.goBack()
		}
	    })
	}else if(!checkDate(to)){
	    alert("请按正确的格式填入时间, 如'2017/10/13'(要切换成英文输入法!)")
	}else if(!checkNumber(money)){
	    alert("缴费金额请填入纯数字, 如'888'")
	}else{
	    alert('申请失败! 请填入正确的信息!')
	}
    }
    render() {
	return (
		<div>
		<Container className='text-center pb-3 mt-5' >
		<Card className="mt-2">
		<CardHeader>续费申请</CardHeader>
		<hr/>
		<CardBody>
		<Form
	    id="form"
	    encType='multipart/form-data'
	    method="post"
		>		
                <FormGroup row>
                <Label sm={2}>电话号码</Label>
                <Col sm={10} className="text-left">
                <Input  name="tel" value={this.state.tel} readOnly={true}/>	
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label sm={2}>缴费金额</Label>
                <Col sm={10}>
                <Input id="money" name="money" placeholder="单位:元"/>
                </Col>
                </FormGroup>
                <FormGroup row>
                <Label sm={2}>到期时间</Label>
                <Col sm={10}>
                <Input id="to"  name="to" placeholder="如:2018/1/1" />
                </Col>
                </FormGroup>				
		</Form >	    
		</CardBody>
		<CardFooter className="text-right">
		<ButtonGroup>
		<Button  onClick={this.apply}>申请</Button>		
		<Button onClick={history.goBack}>完成</Button>
		</ButtonGroup>
		</CardFooter>
		</Card>
		</Container>		
		</div>
		
	);
    }
}
