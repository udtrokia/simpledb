//detail

import React, { Component } from 'react';
import {
    FormGroup,
    Container,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Label,
    Form,
    Input,
    Row,
    Col,
    ButtonGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap'

//drop-zone
import Dropzone from 'react-dropzone'
import dater from 'js-dater'
//check
import {
    checkAge,
    checkTel
}from '../../utils'
import {Link} from 'react-router-dom'
//history
import createHistory from 'history/createBrowserHistory'
const history = createHistory()


//jquery
const $ = require('jquery')
const sess = JSON.parse(sessionStorage.getItem('stat'))
export default class Detail extends Component {
    constructor(props){
	super(props)
	this.state={
	    update:false,
	    detail:'',
	    go:'',
	    avatar:null,
	    preview:'',
	    sex:'',
	    _class:''
	}
    }	
    componentWillMount(){
	this.refresh()
    }
    refresh=()=>{
	const detail = this.props.location.state
	$.post(URL+'/db?type=find&col=student',
	       {_id:detail._id},(res)=>{
		   let data  = res[0]
		   this.setState({
		       detail:data,
		       preview:"http://localhost:3600/studentAvatar/"+data.avatar,
		       sex:data.sex,
		       _class:data._class
		   },()=>{
		       let lists=['name','age','tel']
		       for(var i in lists){
			   $('#'+lists[i])[0].value=data[lists[i]]
		       }
		   })
	       })
    }
    updateCard =()=>{
	let age = $('#age')[0].value
	let tel = $('#tel')[0].value
	if(checkAge(age)&&checkTel(tel)){
	    let data = new FormData($('#form')[0])
	    let _id = this.state.detail._id
	    data.append('Avatar',this.state.avatar)
	    data.append('_id',_id)
	    if(data.avatar==='undefined'){
		data.avatar = new Date().getTime()
	    }
	    $.ajax({
		type:"POST",
		url:URL+'/db?type=update&col=student&avatar='+data.avatar,
		data:data,
		dataType:'JSON',
		processData:false,
		contentType:false,
		success:(res)=>{
		    alert('更新成功！')
		    this.refresh()
		}
	    })
	}else if(!checkAge(age)){
	    alert('请输入正确的年龄')
	}else if(!checkTel(tel)){
	    alert('请输入正确的手机号')
	}else{
	    alert('更新失败,请核对输入的信息!')
	}
    }
    renderRegion=()=>{
	let lists = ['班级一','班级二','班级三']
	const listItems = lists.map((value,key)=>{
            return(
		    <option key={key}>{value}</option>		    
            )
	})
        return 	<Input
	type="select"
	name="_class"
	id="_class"
	value={this.state._class}
	onChange={(e)=>{
	    this.setState({_class:e.target.value})
	}}>{listItems}</Input>
    }
    renderInput=(name,holder,defaultValue)=>{
	return(
		<FormGroup row>
		<Label sm={2}>{holder}</Label>
		<Col sm={10}>
		<Input
	    name={name} id={name} type="text" placeholder={holder}
		/>
		</Col>
		</FormGroup>			    
	)
    }
    onDrop=(avatar)=>{
	this.setState({preview:avatar[0].preview})
	this.setState({avatar:avatar[0]})
    }
    expired=()=>{
	if(this.state.detail.start!==undefined){	
	    let startTime = (this.state.detail.start).split("/")
	    let endTime = (this.state.detail.end).split("/")
	    let start = dater(startTime[0],startTime[1],startTime[2])
	    let end = dater(endTime[0],endTime[1],endTime[2])
	    let substract = end.ms-(new Date().getTime())
	    let fontColor
	    if(dater(substract).days-30<=10){
		fontColor='red'
	    }
	    let dom =(
		<Link to={{
		    pathname:"renewList",
		    state:{detail:this.state.detail}
		}}><text style={{color:fontColor}}>{start.chinese}-{end.chinese}</text>
		    </Link>
	    )
	    return dom
	}
    }
    render() {
	return (
		<div>
		<Container className='text-center pb-3 mt-5' >
		<Card className="mt-2">
		<CardHeader>学生信息</CardHeader>
		<hr/>
		<CardBody>
		<Form
	    id="form"
	    encType='multipart/form-data'
	    method="post"
		>		
		<Row>
		<Col className="mt-4">
		<Dropzone
	    onDrop={this.onDrop}
	    style={{display:'inline-block'}}
		>
		<img
	    style={{width:'8rem',height:'8rem'}}
	    src={this.state.preview}
	    alt=''
		/>
		</Dropzone>
		<Col className="m-1">
		{this.state.detail.region}
	    </Col>
		<Col>{this.expired()}</Col>
		<Label>本季度已缴费:</Label>
		
		<Link to={{
		    pathname:"renew",
		    state:{detail:this.state.detail}
		}}>{this.state.detail.totalAmount}元</Link>
		
		</Col>
		<Col>
		{this.renderInput('name','姓名')}
	    {this.renderInput('age','年龄')}
		<FormGroup row>		
		<Label sm={2}>性别</Label>
		<Col sm={10}>
		<Input type="select" name="sex"
	    value={this.state.sex}
	    onChange={(e)=>{this.setState({sex:e.target.value})}}
		>
		<option >男</option>
		<option>女</option>
		</Input>
		</Col>
		</FormGroup>				
		<FormGroup row>		
		<Label sm={2}>班级</Label>
		<Col sm={10}>
		{this.renderRegion(sess.region)}
	    </Col>
		</FormGroup>
		{this.renderInput('tel','电话')}
	    </Col>
		</Row>	    
		</Form >	    
		</CardBody>
		<CardFooter className="text-right">
		<ButtonGroup>
		<Button  onClick={this.updateCard}>更新</Button>
		<DeleteModal _id={this.props.location.state._id} that={this} />
		<Button onClick={history.goBack}>完成</Button>
		</ButtonGroup>
		</CardFooter>
		</Card>
		</Container>		
		</div>
		
	);
    }
}
class DeleteModal extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    modal: false
	};
    }
    toggle=()=>{
	this.setState({
	    modal: !this.state.modal
	});
    }
    deleteCard = ()=>{
	this.toggle()		   	
	$.post(URL+'/db?type=delete&col=student',
	       {'_id':this.props._id},(res)=>{
		   if(res.stat){
		       alert('删除成功!')
		       history.goBack()
		   }else{
		       alert('删除失败,请联系管理员')
		   }   
	       })
    }
    render() {
	return (

		<Button style={{borderRadius:0}} onClick={this.toggle}>删除
		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		<ModalHeader toggle={this.toggle}>确定删除?</ModalHeader>
		<ModalBody>这将删除用户的个人信息以及所有缴费记录!</ModalBody>
		<ModalFooter>
		<Button color="danger" onClick={this.deleteCard}>确定</Button>{' '}
		<Button color="secondary" onClick={this.toggle}>取消</Button>
		</ModalFooter>
		</Modal>
		</Button>

	);
    }
}
