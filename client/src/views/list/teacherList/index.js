
import React, { Component } from 'react';
import {
    Container,
    Col,
    Table,
    ButtonGroup,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

import {Link} from 'react-router-dom'
import $ from 'jquery'

//history

$.ajaxSettings.traditional = true

export default class List extends Component {
    constructor(props){
	super(props)
	this.state={
	    teacherArr:[],
	    modalShow:false,
	    dropdownOpen:false
	}
    }
    componentWillMount=()=>{
	this.getList({})
    }
    getList=(options)=>{
	if(options.region==="所有"){
	    options={}
	}
	$.post(URL+'/db?type=find&col=teacher',options,(arr)=>{
	    this.setState({teacherArr:arr})
	})
    }
    toggle=()=>{
	this.setState({
	    dropdownOpen: !this.state.dropdownOpen
	});
    }
    
    renderLists=(lists)=>{
	if(lists){
	    const listItems=lists.map((value,key)=>{
		return(
			<tr key={key}>
			<td>{value.region[0]}</td>			
			<td><Link to={{
			    pathname:'/teacherDetail',
			    state:value
			}}>{value.name}</Link></td>
			<td>{value.tel}</td>
			</tr>
		)})
	    return <tbody>{listItems}</tbody>
	}
    }
    renderDropItems=()=>{
	let lists = ['所有','校区一','校区二','校区三','校区四','校区五','校区六']
	const listItems= lists.map((value,key)=>{
	    return(
		    <DropdownItem
		key={key}
		onClick={()=>this.getList({region:value})}
		    >{value}</DropdownItem>
	    )})
	return <div>{listItems}</div>
    }
    render() {
	return (
		<Container className="pb-3">
		<Col className="mb-5">
		<br/>
		<h3 className='text-center mb-5'>教师列表</h3>
		<Col className="text-right m-3">
		<ButtonGroup size="sm">		
		<ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
		<DropdownToggle caret>筛选</DropdownToggle>
		<DropdownMenu right>{this.renderDropItems()}</DropdownMenu>
		</ButtonDropdown>
		</ButtonGroup>
		</Col>
		<Table>
		<thead>
		<tr>
		<th>校区</th>
		<th>姓名</th>
		<th>电话</th>		
		</tr>
		</thead>		
		{this.renderLists(this.state.teacherArr)}
	    </Table>
		</Col>
		</Container>
	);
    }
}


