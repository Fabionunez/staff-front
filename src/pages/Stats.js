import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import employeeService from '../lib/employee-service';
import IconClock from 'react-feather/dist/icons/clock';


import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';


class Stats extends Component {
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
                    Stats 
                  </h1>
                  </div>
                </div>
              </div>


            <div className="card">
              <div className="card-body">
                <div class="alert alert-light" role="alert">
                    <IconClock color="#283e59" size={20} className="mb-1 mr-2" /> Too much for the nvp ;)
                </div> 
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Stats);