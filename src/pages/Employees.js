import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import employeeService from '../lib/employee-service';

class Employees extends Component {
  state = {
    employees: []
  }


  componentDidMount() {
    employeeService.employeesList()
      .then((response) =>{
          this.setState({employees: response})
      })
      .catch((err) => console.log(err))
  }





  render() {
    return (
      <div><p className="pb-4"><Link  to="/employee/add">Add employee</Link></p>
        {
           this.state.employees.map(employee => <p><Link to={`/employee/edit/${employee._id}`} > {employee.name} {employee.surname}</Link></p>)
        }

      </div>
    )
  }
}

export default withAuth(Employees);