//detail

import React, { Component } from 'react';
import {
    FormGroup,
    Container,
    Label,
    Form,
    Modal,
    ModalHeader,
    ModalFooter,
    Input,
    Row,
    Col,
    ButtonGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardText,
    CardFooter
} from 'reactstrap'

//drop-zone
import Dropzone from 'react-dropzone'

//check
import {
    checkAge,
    checkTel
}from '../../utils'
//history
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const sess = JSON.parse(sessionStorage.getItem('stat'))

//jquery
const $ = require('jquery')
export default class Detail extends Component {
    constructor(props){
	super(props)
	this.state={
	    update:false,
	    detail:'',
	    avatar:null,
	    preview:'',
	    modal:false,
	    sex:'',
	    region:['校区一'],
            regionArr:['校区一','校区二','校区三','校区四','校区五','校区六'],
            accountList:null,
	}
    }	
    componentWillMount(){
	this.refresh()
    }
    refresh=()=>{
	const detail = this.props.location.state
	$.post(URL+'/db?type=find&col=teacher',
	       {_id:detail._id},(res)=>{
		   let data = res[0]
		   this.setState({
		       detail:data,
		       preview:URL+"/teacherAvatar/"+data.avatar,
		       sex:data.sex,
		       region:data.region
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
	let avatar = this.state.detail.avatar

	if(checkAge(age)&&checkTel(tel)){	    
	    let data = new FormData($('#form')[0])
	    let _id = this.state.detail._id
	    if(avatar==='undefined'){
		avatar = new Date().getTime()
		data.append('avatar',avatar)	    		
	    }	    
	    data.append('Avatar',this.state.avatar)
	    data.append('auth',sess.dealManager)
	    data.append('_id',_id)
	    $.ajax({
		type:"POST",
		url:URL+'/updateAccount?avatar='+avatar,
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
    deleteCard = ()=>{
	$.post(URL+'/db?type=delete&col=teacher',
	       {'_id':this.state.detail._id},(res)=>{
		   if(res.stat){
		       alert('删除成功!')
		       history.goBack()
		   }
	       })
    }

    renderInput=(name,holder)=>{
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
    checked=(props,value)=>{
        //props--arr
	if(props){
            var i = props.length;
            while (i--) {
		if (props[i] === value) {
                    return true;
		}
            }
            return false;
	}
    }
    renderChecks=(lists,props)=>{
        if(lists!=null){
            const listItems=lists.map((value,key)=>{
                return(
                        <Label check key={key} className="mr-3">
                        <Input
                    onChange={()=>{}}
                    defaultChecked={this.checked(props,value)}
                    name={value}
                    type="checkbox" />{' '}
                    {value}
                    </Label>
                )
            })
            return <FormGroup check>{listItems}</FormGroup>
        }

    }
    onDrop=(avatar)=>{
	this.setState({preview:avatar[0].preview})
	this.setState({avatar:avatar[0]})
    }
    render() {
	return (
		<div>
		<Container className='text-center pb-3 mt-3' >
		<Card className=" mt-2">
		<CardHeader>教师信息</CardHeader>
		<hr/>
		<Form
	    id="form"
	    encType='multipart/form-data'
	    method="post"
		>				
		<CardBody>
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
		</Col>
		<Col>
		{this.renderInput('name','姓名')}
	    {this.renderInput('age','年龄')}
		<FormGroup row>		
		<Label sm={2}>性别</Label>
		<Col sm={10}>
		<Input type="select" name="sex"
	    value={this.state.sex}
	    onChange={(e)=>this.setState({
		sex:e.target.value
	    })}
		>
		<option >男</option>
		<option>女</option>
		</Input>
		</Col>
		</FormGroup>				
		{this.renderInput('tel','电话')}
		</Col>
		</Row>	    
		</CardBody>
		
		<Col sm={11} style={{height:1,alignSelf:'center',backgroundColor:'#eee'}}></Col>
		
                <CardBody className=" text-left" >
                <CardText>学生管理</CardText>
                {this.renderChecks(this.state.regionArr,this.state.detail.region)}
                <CardText className="mt-4">其他权限</CardText>
                <FormGroup check>
                <Label check className="mr-3">
                <Input
            name="dealTeacher" defaultChecked={this.state.detail.dealTeacher} type="checkbox" />{' '}
            查看/添加教师
            </Label>
                <Label check className="mr-3">
                <Input
            name="dealRenew" defaultChecked={this.state.detail.dealRenew} type="checkbox" />{' '}
            缴费权限
            </Label>
                <Label check className="mr-3">
                <Input
            name="dealManager" defaultChecked={this.state.detail.dealManager} type="checkbox" />{' '}
            管理权限
            </Label>
                </FormGroup>
		</CardBody>
                </Form>		

		<CardFooter className="text-right">
		<ButtonGroup>
		<Button  onClick={this.updateCard}>更新</Button>
		<DeleteModal _id={this.props.location.state._id}/>
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
	$.post(URL+'/db?type=delete&col=teacher',
	       {'_id':this.props._id},(res)=>{
		   if(res.stat){
		       alert('删除成功!')
		       history.goBack()
		   }
	       })
    }
    render() {
	return (
		<Button style={{borderRadius:0}} onClick={this.toggle}>删除
		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		<ModalHeader toggle={this.toggle}>确定删除?</ModalHeader>
		<ModalFooter>
		<Button color="danger" onClick={this.deleteCard}>删除</Button>{' '}
		<Button color="secondary" onClick={this.toggle}>完成</Button>
		</ModalFooter>
		</Modal>
		</Button>
	);
    }
}
