import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import employeeService from '../lib/employee-service';
import IconAdd from 'react-feather/dist/icons/plus';
import IconSearch from 'react-feather/dist/icons/search';
import EmployeeItem from '../components/employees/EmployeeItem';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';


class Employees extends Component {
  state = {
    employees: []
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

        
     console.log("Deleting")
    })
    .catch((err) => console.log(err))


  }



  render() {
    return (






      <div>
        <Navbar />
        <div className="main-content">

          <TopBar />

          <div className="p-4">
            <div class="pb-4">
              <h6 class="header-pretitle">
                All
              </h6>
              <h1 class="header-title">
                Employees
              </h1>
            </div>
            <div className="card">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col">
                    <h4 class="card-header-title">
                      <Link  to="/employee/add">Add employee </Link>
                    </h4>
                  </div>
                </div>
              </div>
              <div class="card-header">
                <form>
                  <div class="input-group input-group-flush input-group-merge">
                    <input type="search" class="form-control form-control-prepended search" placeholder="Search" />
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <IconSearch size={18} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush list my-n3">   
                {
                  this.state.employees.map(employee => <EmployeeItem  {...employee} handleDeleting={this.handleDeleting}  getAllEmployees={this.getAllEmployees} />)
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

{/* <p key={employee._id}><Link to={`/employee/edit/${employee._id}`} > {employee.name} {employee.surname}</Link> <a href="javascript:;" onClick={() => this.handleDeleting(employee._id)} >Delete</a></p>) */}
