import React ,{Component}from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from 'reactstrap';

import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const sess = JSON.parse(sessionStorage.getItem('stat'))
      
export default class NavBar extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    isOpen: false,
	    dropdownOpen: false,
	    guide:false
	};
    }    
    toggle=()=>{
	if(sessionStorage.getItem('stat')){
	    this.setState({
		dropdownOpen: !this.state.dropdownOpen
	    });
	}
    }
    guideToggle=()=>{
	if(sessionStorage.getItem('stat')){
	    this.setState({
		guide: !this.state.guide
	    });
	}else{
	    alert('请先登录')
	}
    }    
    handleLogout=()=>{
	new Promise(()=>sessionStorage.removeItem('stat')).then(
	    history.replace('/')
	).then(history.go(0))
    }
    backIndex=()=>{
	if(sessionStorage.getItem('stat')){
	    history.push('/regionChoose')
	    history.go(0)
	}else{
	    alert('请先登录')
	}
    }
    navbar=()=>{

	if(sessionStorage.getItem('stat')){
	    return '/regionChoose'
	}else{
	    alert('请先登录')
	}
    }
    student=()=>{
	history.push('/regionChoose')
	history.go()
    }
    teacher=()=>{
	if(sess.dealTeacher){
	    history.push('/teacherList')
	    history.go()
	}else{
	    alert('无此权限')
	}
    }
    renew=()=>{
	if(sess.dealRenew){
	    history.push('/renewApply')
	    history.go()
	}else{
	    alert('无此权限')
	}
    }    
    render() {
	return (
		<div>
		<Navbar color="faded" light expand>
		<NavbarToggler />
		<NavbarBrand href={this.navbar}>简易数据库</NavbarBrand>
		<Collapse  navbar>
		<Nav className="ml-auto" navbar>
		<NavDropdown isOpen={this.state.guide} toggle={this.guideToggle}>
		<DropdownToggle nav caret>导航</DropdownToggle>
		<DropdownMenu right>
		<DropdownItem onClick={this.student}>学生</DropdownItem>
		<DropdownItem onClick={this.teacher}>教师</DropdownItem>
		<DropdownItem onClick={this.renew}>缴费申请</DropdownItem>		
		</DropdownMenu>
		</NavDropdown>		
		<NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
		<DropdownToggle nav caret>选项</DropdownToggle>
		<DropdownMenu right>
		<DropdownItem
		onClick={this.handleLogout}
		    >退出登录</DropdownItem>	    
		</DropdownMenu>
		</NavDropdown>
		</Nav>
		</Collapse>
		</Navbar>
		</div>
	);
    }
}
