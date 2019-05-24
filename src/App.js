import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Employees from './pages/Employees';
import EmployeesAdd from './pages/EmployeesAdd';
import EmployeesEdit from './pages/EmployeesEdit';
import Company from './pages/Company';
import Teams from './pages/Teams';
import Stats from './pages/Stats';

import Page404 from './pages/Page404';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


class App extends Component {
  render() {
    return (
      <AuthProvider>
        
        <div>          
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute exact path="/" component={Login} />
            <PrivateRoute path="/employees" component={Employees} />
            <PrivateRoute path="/employee/add" component={EmployeesAdd} />
            <PrivateRoute path="/employee/edit/:id" component={EmployeesEdit} />
            <PrivateRoute path="/company" component={Company} />
            <PrivateRoute path="/teams" component={Teams} />
            <PrivateRoute path="/stats" component={Stats} />
            <Route component={Page404} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
