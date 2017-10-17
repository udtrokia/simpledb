/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Input,
    Label
} from 'reactstrap';

import $ from 'jquery'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()

class ModalExample extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    modal: false
	};
    }
    componentWillMount(){
	if(sessionStorage.getItem('stat')){
	    history.replace('/home')
	    history.go(0)
	}
    }
    toggle=()=>{
	this.setState({
	    modal: !this.state.modal
	});
    }

    register=(e)=>{
	e.preventDefault()
	let tel_len = $('#tel')[0].value.length
	let psw_len = $('#password')[0].value.length
	let name_len = $('#name')[0].value.length	
	if(tel_len===11&&psw_len>=7&&name_len!==0){
	let form = new FormData($('#form')[0])
	    $.ajax({
		url:URL+'/register',
		type:'POST',
		data: form,
		cache: true,
		processData: false,
		contentType: false,
		dataType:'JSON'
	    }).then((res)=>{
		if(res.stat){
		    alert('注册成功')
		    this.toggle()
		    let sess = JSON.stringify(res.sess)
		    console.log(res)
		    sessionStorage.setItem('stat',sess)
		    console.log(sessionStorage.getItem('stat'))
		    history.replace('/regionChoose')
		    history.go()
		}else{
		    alert('账号已存在')
		}
	    })
	}else if(tel_len!==11){
	    alert('请输入正确的电话号码')
	}else if(psw_len<7){
	    alert('密码过短,请设置7位以上')
	}else if(name_len===0){
	    alert('请输入姓名')
	}
    }
    render() {
	return (
		<div className="text-center pt-3">
		<Button

	    onClick={this.toggle}
	    style={{width:'20rem'}}
		>
		注册
	    </Button>
		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		<ModalHeader toggle={this.toggle}>注册</ModalHeader>
		<ModalBody>
		<Form id="form" name="form" action="/home" encType="multipart/form-data">
		<Label>姓名</Label>
		<Input id='name'  name="name"/>	
		<Label>手机号</Label>
		<Input id="tel" name="tel"/>
		<Label>密码</Label>
		<Input id='password' type="password" name="password"/>
		</Form>		
		</ModalBody>
		<ModalFooter>
		<Button color="primary"
	    onClick={this.register}
		>注册</Button>{' '}
		<Button color="secondary" onClick={this.toggle}>取消</Button>
		</ModalFooter>
		</Modal>
		</div>
	);
    }
}

export default ModalExample;
