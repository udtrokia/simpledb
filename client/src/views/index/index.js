
import React, { Component } from 'react';
import {
    Container,
    Col,
} from 'reactstrap'

import Register from './register'
import Login from './login'

class Index extends Component {
    constructor(props){
	super(props)
    }
    render() {
	return (

		<Container>
		<Col className="text-center mt-5 pb-2">
{
//			<img
//	    alt="not found"
//	    src="http://localhost:3600/1.png"
//	    style={{width:'18rem',height:'18rem'}}
//
//		/>
}
		<h1 style={{margin:'8rem'}}>简易数据库</h1>
	    </Col>
		<hr className="my-2" style={{width:'65%'}}/><br/>
		<Col>		
		<p className="text-center lead">
		登录进入管理系统
	    </p>
		</Col>
		<Col>
		<Login/>
		<Register/>
		</Col>
		</Container>

	);
    }
}


export default Index;

