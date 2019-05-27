import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import employeeService from '../lib/employee-service';

import IconAdd from 'react-feather/dist/icons/plus';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import UserTable from '../components/employees/UserTable';


class Employees extends Component {
  state = {
    employees: [],
    keyword: "",
    filterEmployees: []
  }
  getAllEmployees = () =>{
    employeeService.employeesList()
    .then((response) =>{
        this.setState({employees: response})
    })
    .catch((err) => console.log(err))
  } 

  componentDidMount() {
    this.getAllEmployees();
  }

  handleDeleting(id){
    employeeService.employeeDelete(id)
    .then((response) =>{
      this.getAllEmployees();
    })
    .catch((err) => console.log(err))
  }

  updateKeyword = (event) => {
    this.setState({keyword: event.target.value});
  }

  userCanDelete = () => {
    let {  user } = this.props; //to pass if it's admin
    let isAdmin = user.isAdmin;
    if(isAdmin){
      return isAdmin;
    }else{
      return null;
    }  
  }

  render() {
    const {  user } = this.props; 


    return (
      <div>    
        <Navbar pathname={this.props.location.pathname} />
        <div className="main-content">
          <TopBar {...user} />
          <div className="main-content-padding">
              <div className="header-body header-employees">
                <div className="row align-items-center">
                  <div className="col">
                  <h6 className="header-pretitle">All</h6>
                  <h1 className="header-title">
                    Employees <span className="badge badge-soft-secondary" style={{"font-size":"10px"}}>{this.state.employees.length}</span>
                  </h1>
                  </div>
                  {user.isAdmin ?
                  <div className="col-auto">
                    <Link to="/employee/add" className="btn btn-primary"><IconAdd size={20} color="white" className="mr-2" />Add employee </Link>
                  </div>
                  :""}
                </div>
              </div>
              <UserTable 
                {...this.state}
                {...user}
                userCanDelete={this.userCanDelete} 
                updateKeyword={this.updateKeyword} 
                handleDeleting={this.handleDeleting}
                getAllEmployees={this.getAllEmployees}  
              />
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Employees);