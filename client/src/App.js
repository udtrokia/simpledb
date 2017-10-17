
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

//
import Navbar from './component/navbar'
//pages
import Index from './views/index'
import Test from './views/test'
import RegionChoose from './views/list/regionChoose'
import StudentList from './views/list/studentList'
import SaveStudent from './views/list/studentList/save'
import StudentDetail from './views/list/studentList/detail'
import TeacherList from './views/list/teacherList'
import SaveTeacher from './views/list/teacherList/save'
import TeacherDetail from './views/list/teacherList/detail'
import Renew from './views/renew'
import RenewList from './views/renew/list'
import RenewApply from './views/renew/apply'
//
class App extends Component {
    render() {
      return (
	      <div>
	      <Navbar />
	      <Router className="foo">
	      <Switch>
	      <Route exact path='/' component={Index} />
	      <Route path='/index' component={Index} />
	      <Route path='/regionChoose' component={RegionChoose}/>
	      <Route path='/studentList' component={StudentList} />
	      <Route path='/studentDetail' component={StudentDetail} />	      	      
	      <Route path='/saveStudent' component={SaveStudent} />	      
	      <Route path='/teacherList' component={TeacherList} />	      
	      <Route path='/saveTeacher' component={SaveTeacher} />
	      <Route path='/TeacherDetail' component={TeacherDetail} />	      	      	      
	      <Route path='/renew' component={Renew} />
	      <Route path='/renewList' component={RenewList} />	      	      
	      <Route path='/renewApply' component={RenewApply} />	      
	      <Route path='/test' component={Test} />
	      </Switch>	      
	      </Router>
	      </div>
    );
  }
}

export default App;
