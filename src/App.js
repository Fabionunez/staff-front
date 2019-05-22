import React, { Component } from 'react';
import {Switch} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Navbar from './components/Navbar';
import Employees from './pages/Employees';
import EmployeesAdd from './pages/EmployeesAdd';
import EmployeesEdit from './pages/EmployeesEdit';

import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './providers/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Navbar />
        <div className="container mt-3">          
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute exact path="/" component={Login} />
            <PrivateRoute path="/employees" component={Employees} />
            <PrivateRoute path="/employee/add" component={EmployeesAdd} />
            <PrivateRoute path="/employee/edit/:id" component={EmployeesEdit} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;
