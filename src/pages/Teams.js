import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

import teamService from '../lib/team-service';

import IconAdd from 'react-feather/dist/icons/plus';
import TeamsTable from '../components/teams/TeamsTable';

import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';


class Teams extends Component {
  state = {
    teams: []
  }

  getAllTeams = () =>{
    teamService.teamList()
    .then((response) =>{
        // console.log(response)
        this.setState({teams: response})
        
    })
    .catch((err) => console.log(err))

  } 

  componentDidMount() {
    this.getAllTeams();
    
  }

  handleDeleting(id){
    teamService.teamDelete(id)
    .then((response) =>{
      this.getAllTeams();
    })
    .catch((err) => console.log(err))

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
    // const filteredArray = this.state.employees.filter( employee => {
    //   return (employee.name + ' ' + employee.surname).toLowerCase().includes(this.state.keyword.toLowerCase())
    // })

    const {  user } = this.props; 
    
    // console.log("this.state.teams.usersId ", this.state.teams)

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
                  Teams <span className="badge badge-soft-secondary" style={{"fontSize":"10px"}}>{this.state.teams.length}</span>
                </h1>
                </div>
                {user.isAdmin ?
                <div className="col-auto">
                  <Link to="/teams/add" className="btn btn-primary"><IconAdd size={20} color="white" className="mr-2" />Add team </Link>
                </div>
                :""}
              </div>
            </div>

            <TeamsTable 
              {...this.state} 
              handleDeleting={this.handleDeleting} 
              getAllTeams={this.getAllTeams}
              userCanDelete={this.userCanDelete}
                />


          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Teams);