import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import employeeService from '../lib/employee-service';
import IconSearch from 'react-feather/dist/icons/search';
import EmployeeItem from '../components/employees/EmployeeItem';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';


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
    const filteredArray = this.state.employees.filter( employee => {
      return (employee.name + ' ' + employee.surname).toLowerCase().includes(this.state.keyword.toLowerCase())
    })

    const {  user } = this.props; 
    
    

    return (

      <div>    

        <Navbar />
        <div className="main-content">

          <TopBar {...user} />

          <div className="p-4">




              <div className="header-body header-employees">
                <div className="row align-items-center">
                  <div className="col">
                  <h6 className="header-pretitle">All</h6>
                  <h1 className="header-title">
                    Employees <span className="badge badge-soft-secondary" style={{"font-size":"10px"}}>{this.state.employees.length}</span>
                  </h1>
                  </div>
                  <div className="col-auto">
                    <Link to="/employee/add" className="btn btn-primary">Add employee </Link>
                  </div>
                </div>
              </div>


            <div className="card">

              <div className="card-header">
                <form>
                  <div className="input-group input-group-flush input-group-merge">
                    <input onChange={this.updateKeyword} type="search" className="form-control form-control-prepended search" placeholder="Search" />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <IconSearch size={18} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush list my-n3">   
                {
                  filteredArray.map(employee => <EmployeeItem  
                                                  {...employee} 
                                                  handleDeleting={this.handleDeleting}  
                                                  getAllEmployees={this.getAllEmployees}
                                                  userCanDelete={this.userCanDelete}
                                                    />)
                }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Employees);