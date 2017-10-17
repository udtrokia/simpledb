
import React, { Component } from 'react';
import {
    Container,
    Col,
    Table,
    Button,
    ButtonGroup,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'

import {Link} from 'react-router-dom'
import {intersection} from '../utils'
import $ from 'jquery'

//history
import createHistory from 'history/createBrowserHistory'
import dater from 'js-dater'
const history = createHistory()

$.ajaxSettings.traditional = true

const sess = JSON.parse(sessionStorage.getItem('stat'))
export default class List extends Component {
    constructor(props){
	super(props)
	this.state={
	    studentArr:[],
	    modalShow:false,
	    dropdownOpen:false
	}
    }
    componentWillMount=()=>{
	this.getList({})
    }
    getList=(options)=>{
	let preState = this.props.location.state
	let region = intersection(sess.region,preState.region)
	options['region']=region
	if(options._class==="所有"){
	    delete options._class
	}else if(options._class==="待缴费"){
	    delete options._class
	    options['expired']=true
	}
	$.post(URL+'/db?type=find&col=student',options,(arr)=>{
	    this.setState({studentArr:arr})
	})
    }
    toggle=()=>{
	this.setState({
	    dropdownOpen: !this.state.dropdownOpen
	});
    }
    add=()=>{
	history.push('/saveStudent',{region:this.props.location.state.region})
	history.go()
    }
    expired=(value)=>{
        let endTime = value['end'].split("/")
	let end = dater(endTime[0],endTime[1],endTime[2])
        let substract = end.ms-(new Date().getTime())
        if(dater(substract).days<10){
	    if(value.expired){
		$.post(URL+'/db?type=update&col=student',{_id:value._id,expired:true})		
		return 'red'
	    }else{
		return 'red'
	    }
        }
    }    
    renderLists=(lists)=>{
	if(lists){
	    const listItems=lists.map((value,key)=>{
		return(
			<tr key={key}>
			<td>{value._class}</td>			
			<td><Link to={{
			    pathname:'/studentDetail',
			    state:value
			}}>{value.name}</Link></td>
			<td style={{color:this.expired(value)}}>{value.end}</td>
			<td>{value.tel}</td>
			</tr>
		)})
	    return <tbody>{listItems}</tbody>
	}
    }
    renderDropItems=()=>{
	let lists = ['所有','班级一','班级二','班级三','待缴费']
	const listItems= lists.map((value,key)=>{
	    return(
		    <DropdownItem
		key={key}
		onClick={()=>this.getList({_class:value})}
		    >{value}</DropdownItem>
	    )})
	return <div>{listItems}</div>
    }
    render() {
	return (
		<Container className="pb-3">
		<Col className="mb-5">
		<br/>
		<h3 className='text-center mb-5'>{this.props.location.state.region}</h3>
		<Col className="text-right m-3">
		<ButtonGroup size="sm">		
		<ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
		<DropdownToggle caret>筛选</DropdownToggle>
		<DropdownMenu right>{this.renderDropItems()}</DropdownMenu>
		</ButtonDropdown>
		<Button onClick={this.add} size="sm">添加</Button>
		</ButtonGroup>
		</Col>
		<Table>
		<thead>
		<tr>
		<th>班级</th>
		<th>姓名</th>
		<th>到期时间</th>
		<th>电话</th>		
		</tr>
		</thead>		
		{this.renderLists(this.state.studentArr)}
	    </Table>
		</Col>
		</Container>
	);
    }
}


