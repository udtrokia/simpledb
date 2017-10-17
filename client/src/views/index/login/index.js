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
    toggle=()=>{
	this.setState({
	    modal: !this.state.modal
	});
    }

    login=(e)=>{
	e.preventDefault()
	let form = new FormData($('#form')[0])
	$.ajax({
	    url:URL+'/login',
	    type:'POST',
	    data: form,
	    cache: true,
	    processData: false,
	    contentType: false,
	    dataType:'JSON'
	}).then((res)=>{
	    if(res.stat){
 		this.toggle()
		new Promise((resolve,reject)=>{
		    let sess = JSON.stringify(res.sess)		    
		    sessionStorage.setItem('stat',sess)
		    history.replace('/regionChoose')
		    resolve(history.go())
		})
	    }else{
		alert('账号或密码错误')
	    }
	})
    }
    render() {
	return (
		<div className="text-center pt-3">
		<Button
	    onClick={this.toggle}
	    style={{width:'20rem'}}
		>
		登录
	    </Button>
		<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		<ModalHeader toggle={this.toggle}>登录</ModalHeader>
		<ModalBody>
		<Form id="form" name="form" action="/regionChoose" encType="multipart/form-data">
		<Label>手机号</Label>
		<Input id="tel" name="tel"/>
		<Label>密码</Label>
		<Input id='password' type="password" name="password"/>
		</Form>		
		</ModalBody>
		<ModalFooter>
		<Button color="primary"
	    onClick={this.login}
		>登录</Button>{' '}
		<Button color="secondary" onClick={this.toggle}>取消</Button>
		</ModalFooter>
		</Modal>
		</div>
	);
    }
}

export default ModalExample;
