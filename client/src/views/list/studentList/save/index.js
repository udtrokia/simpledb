
import React, { Component } from 'react';
import {
    FormGroup,
    Container,
    Label,
    Form,
    Input,
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardText,
    CardBody,
    CardFooter
} from 'reactstrap'

//drop-zone
import Dropzone from 'react-dropzone'
//check
import {
    checkTel,
    checkAge,
    checkChinese
}from '../../utils'
//history
import dater from 'js-dater'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

//jquery
const $ = require('jquery')
class Save extends Component {
    constructor(props){
	super(props)
	this.state={
	    avatar:null,
	    preview:null,
	    modal:false
	}
    }
    componentWillMount=()=>{

    }
    handleSubmit=(event)=>{
	event.preventDefault()
	let name=$('#name')[0].value
	let tel= $('#tel')[0].value
	let age = $('#age')[0].value
	if(!checkChinese(name)){
	    alert('请输入正确的名称(中文)')
	}else if(!checkTel(tel)){
	    alert('请输入正确的电话号码!')
	}else if(!checkAge(age)){
	    alert('请输入正确的年龄')
	}else{
	    var form = new FormData($('#form')[0])
	    let avatar = new Date().getTime()
	    let time = dater(new Date().getTime()).format
	    form.append('start',time)
	    form.append('end',time)
	    form.append('totalAmount',0)
	    form.append('region',this.props.location.state.region)
	    form.append('Avatar',this.state.avatar)
	    $.ajax({
		url:URL+"/db?type=save&col=student&avatar="+avatar,
		type:'POST',
		data: form,
		cache: true,
		processData: false,
		contentType: false,
		dataType:'JSON'
	    }).then((res)=>{
		if(res.stat){
		    alert('添加成功')
		    history.goBack()
		}else{
		    alert('添加失败,电话号码重复')
		}
	    })
	}
    }

    renderClass=()=>{
	let lists = ['班级一','班级二','班级三']
        let doms = lists.map((value,key)=>{
	    return(
		    <option key={key}>{value}</option>
	    )
        })
        return 	<Input
	type="select"
	name="_class"
	id="_class"
	defaultValue={lists[0]}
	    >{doms}</Input>	    

    }
    renderInput=(name,holder,defaultValue)=>{
	return(
		<FormGroup row>
		<Label sm={2}>{holder}</Label>
		<Col sm={10}>
		<Input name={name} id={name} type="text" placeholder={holder} />
		</Col>
		</FormGroup>			    
	)
    }
    onDrop=(avatar)=>{
	this.setState({preview:avatar[0].preview})
	this.setState({avatar:avatar[0]})
    }
    render() {
	return (
		<div>
		<Container className='text-center mt-5 pb-3' >
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
		<Col>
		<Label className="mt-2">{this.props.location.state.region}</Label>
		</Col>
		<CardText>
		在这里上传学生头像
	    </CardText>
		</Col>
		<Col>
		{this.renderInput('name','姓名')}
	    {this.renderInput('age','年龄')}
		<FormGroup row>		
		<Label sm={2}>性别</Label>
		<Col sm={10}>
		<Input type="select" name="sex"  defaultValue="男">
		<option >男</option>
		<option>女</option>		
		</Input>
		</Col>
		</FormGroup>				
		<FormGroup row>		
		<Label sm={2}>班级</Label>
		<Col sm={10}>
		{this.renderClass()}
	    </Col>
		</FormGroup>				
		{this.renderInput('tel','电话')}
		</Col>
		</Row>
		</Form >	    
		</CardBody>
		<CardFooter className="text-right">
		<Button onClick={this.handleSubmit}>提交</Button>
		</CardFooter>
		</Card>
		</Container>		
		</div>
		
	);
    }
}


export default Save;



