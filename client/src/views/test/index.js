import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

//Component link to './components'
import Counter from './components'
// Action  link to './actions'
import {increaseAction} from './actions'
// Reducer link to './reducer'
import {counter} from './reducer'
// link to './container'
// Map Redux state to component props
const mapStateToProps=(state)=>{
    return{
	value: state.count
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
	onIncreaseClick:()=>dispatch(increaseAction)
    }
}
// Store
const store = createStore(counter)

// Connected Component
const Redux = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default class R extends Component{
    componentWillMount(){
	
    }
    render(){
	return(
		<Provider store={store}>
		<Redux />
		</Provider>
	)
    }
}
