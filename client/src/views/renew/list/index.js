//detail

import React, { Component } from 'react';
import {
    Container,
    Col,
    Table
} from 'reactstrap'

import dater from 'js-dater'
//config

//jquery
const $ = require('jquery')
export default class Detail extends Component {
    constructor(props){
	super(props)
	this.state={
	    list:null,
	    detail:this.props.location.state.detail,
	    totalAmount:this.props.location.state.detail.totalAmount
	}
    }
    componentWillMount(){
	this.getList()
    }
    getList=()=>{
	$.post(URL+'/renew?type=find',{id:this.state.detail._id},(res)=>{
	    this.setState({list:res[0]})
	})
    }
    renderList=()=>{
	let list = this.state.list
	if(list){
	    let record = list['record']
	    let listItems = record.map((value,key)=>{
		let obj = JSON.parse(value)
		let time =  dater(Object.keys(obj)[0]).format
		let money = Object.values(obj)[0]
		let teacher = Object.values(obj)[1]
		let end = Object.values(obj)[2]
		return(
			<tr key={key}>
			<td>{teacher}</td>
			<td>{money}元</td>			
			<td>{time}-{end}</td>
			</tr>
		)
	    })
	    return <tbody>{listItems}</tbody>
	}
    }
    render() {
	return (
		<Container>
		<Col><h4 className="text-center mt-2 mb-5">缴费历史</h4></Col>
		<Col className="text-right mb-2"><h7>总计:{this.state.totalAmount}元</h7></Col>
		<Table>
		<thead>
		<tr>
		<th>申请老师</th>
		<th>金额</th>		
		<th>时间</th>
		</tr>
		</thead>
		{this.renderList()}
		</Table>
		</Container>
	);
    }
}
