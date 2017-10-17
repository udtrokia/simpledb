import React, {Component} from 'react'
import ProTypes from 'prop-types'

import $ from 'jquery'

export default class Demo extends Component{

    post=(e)=>{
	e.preventDefault()
	let form = new FormData($('#form')[0])
	$.ajax({
	    url:'http://localhost:3200/mid',
	    type:'POST',
	    data:form,
	    processData: false,
            contentType: false,
            dataType:'JSON'
	}).then((res)=>{
	    console.log(res)
	})

	
    }
    render(){
	const {value, onIncreaseClick} = this.props
	return(
		<div>
		<form name="form" id="form" encType="multiparty/form-data">
		<input type="text" name="t1"/>
		<br/>
		<input type="text" name="t2"/>
		<br/>
		<input type="submit" onClick={this.post}/>
		</form>
		<span>{value}</span>
		<button onClick={onIncreaseClick}>Increase</button>
	    </div>
	)
    }
}

Demo.propTypes={
    value: ProTypes.number.isRequired,
    onIncreaseClick: ProTypes.func.isRequired
}
