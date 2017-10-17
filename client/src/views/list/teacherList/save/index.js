
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

//css
import {
    checkChinese,
    checkTel,
    checkAge
}from '../../utils'

//history
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

//jquery
const $ = require('jquery')
class Save extends Component {
    constructor(props){
	super(props)
	this.state={
	    id:'',
	    avatar:null,
	    preview:null,
	    modal:false
	}
    }
    componentWillMount=()=>{
	$.post(URL+'/db?type=id&col=teacher',{},(data)=>{
	    //make up id
	    let id = data.id.toString()
	    let len= Number(id.length)
	    id = "0".repeat(4-len)+id
	    //set state
	    this.setState({id:id})
	    console.log('this.state.id: '+this.state.id)
	})
    }
    handleSubmit=(event)=>{
	event.preventDefault()
	let tel = $('#tel')[0].value
	let name = $('#name')[0].value
	let age = $('#age')[0].value
	if(!checkTel(tel)){
	    alert('请输入正确的电话号码')
	}else if(!checkAge(age)){
	    alert('请输入年龄')
	}else if(!checkChinese(name)){
	    alert('请输入正确的中文名')
	}else{
	    let avatar = new Date().getTime()
	    var form = new FormData($('#form')[0])	    
	    form.append('Avatar',this.state.avatar)
	    $.ajax({
		url:"http://localhost:3600/simpledb/db?type=save&col=teacher&avatar="+avatar,
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
		    alert('添加失败')
		}
	    })
	}
    }

    renderRegion=()=>{
	let lists = ['校区一','校区二','校区三','校区四','校区五','校区六']
        let doms = lists.map((value,key)=>{
	    return(
		    <option key={key}>{value}</option>
	    )
        })
        return 	<Input
	type="select"
	name="region"
	id="region"
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
		<CardHeader>教师信息</CardHeader>
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
		<Label className="mt-2"></Label>
		</Col>
		<CardText>
		在这里上传教师头像
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
		<Label sm={2}>校区</Label>
		<Col sm={10}>
		{this.renderRegion()}
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



