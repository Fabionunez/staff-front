import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import employeeService from '../lib/employee-service';
import IconSearch from 'react-feather/dist/icons/search';
import IconAdd from 'react-feather/dist/icons/plus';
import EmployeeItem from '../components/employees/EmployeeItem';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';


class Teams extends Component {
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

         <Navbar pathname={this.props.location.pathname} />

        <div className="main-content">

          <TopBar {...user} />

          <div className="main-content-padding">




              <div className="header-body header-employees">
                <div className="row align-items-center">
                  <div className="col">
                  <h6 className="header-pretitle">All</h6>
                  <h1 className="header-title">
                    Teams 
                  </h1>
                  </div>
                  {/* {user.isAdmin ?
                  <div className="col-auto">
                    <Link to="/employee/add" className="btn btn-primary"><IconAdd size={20} color="white" className="mr-2" />Add employee </Link>
                  </div>
                  :""} */}
                </div>
              </div>


            <div className="card">
              <div className="card-body">
                <div class="alert alert-secondary" role="alert">
                    Soon you will be able to organize your employees in departments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Teams);