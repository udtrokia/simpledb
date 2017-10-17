//chooseRegion
import React,{Component} from 'react'
import{
    ListGroup,
    ListGroupItem,
    Label,
    Col,
    Container,
}from 'reactstrap'
import createHistory from 'history/createBrowserHistory'
import {intersection} from '../utils'
const history = createHistory()
const sess = JSON.parse(sessionStorage.getItem('stat'))

export default class ChooseRegion extends Component{
    click=(region,value)=>{
	let check = intersection(sess.region,value)
	if(check.length===1){
	    history.push('/studentList',{'region':value})
	    history.go()
	}else{
	    alert('未获得权限,请与管理员联系')
	}
    }
    renderCard=(props)=>{
	let region=['校区一','校区二','校区三','校区四','校区五','校区六']
	const listItems = region.map((value,key)=>{
	    return(
		    <ListGroupItem key={key} onClick={()=>this.click(region,value)} action>
		    <Col key={key} className="mt-3">
		    <Label>{value}</Label>
		    </Col>
		    </ListGroupItem>
	    )
	})
	return(
		<ListGroup>{listItems}</ListGroup>
	)
    }
    render(){
	return(
		<Container >
		<h4 className="text-center mt-2 mb-5">校区列表</h4>
		{this.renderCard()}
	    </Container>
	)
    }
}
