import React, { Component } from 'react';
import { ValidationForm, TextInput, SelectGroup, Checkbox, Radio, FileInput, BaseFormControl } from "react-bootstrap4-form-validation"
import validator from 'validator';
import { withAuth } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

import employeeService from '../../lib/employee-service';
import teamService from '../../lib/team-service';


import Navbar from '../../components/Navbar';
import TopBar from '../../components/TopBar';
import SelectEmployeeTable from '../../components/teams/SelectEmployeeTable';


class TeamAdd extends Component {
  state = {
    name: "",
    usersIds: [],
    teamLeaderid: "",
    companyId: this.props.user.companyID,
    mission: "",
    vision: "",
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

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  
  updateKeyword = (event) => {
    console.log("updating keyword")
    this.setState({keyword: event.target.value});
  }


  handleSubmit = (e, formData, inputs) => {
    e.preventDefault();

    const { 
      name,
      usersIds,
      teamLeaderid,
      companyId,
      mission,
      vision
    } = this.state;


      teamService.teamAdd({ 
        name,
        usersIds,
        teamLeaderid,
        companyId,
        mission,
        vision })
    .then((employee) => {
      this.props.history.push("/teams")
    })
    .catch(error => console.log(error) )



  }

  handleErrorSubmit = (e, formData, errorInputs) => {
      console.error(errorInputs)
  }


  updateSelectEmployees = () =>{

    let checks = document.getElementsByClassName('selectedEmployees');
    let newChecks = [];

    for(var i = 0; i < checks.length; i ++){
      if(checks[i].checked){
        newChecks.push(checks[i].value)
      }
      this.setState({usersIds: newChecks})
    }
    
    this.state.usersIds.forEach( (check, index, array) => {
      console.log(check)
    })


  }

  checkOrNot = (id) =>{

   //console.log("checked >", id);
    console.log(document.getElementById(id).checked)

  
      
  }

  render() {
    const {  user } = this.props; 
    //console.log(this.state.companyId)
    return (
        <div>
          <Navbar pathname={this.props.location.pathname} />
          <div  className="main-content">
            <TopBar {...user} />
            <div className="main-content-padding">
            <div className="header-body mb-5">
                <h6 className="header-pretitle">
                Add
                </h6>
                <h1 className="header-title">
                New team
                </h1>
            </div>  

            <div className="container p-0 m-0" >

                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} style={{maxWidth: '800px'}}>
                    {/* <input type="hidden" id="id" name="id" value={this.props.match.params.id} /> */}


                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="name">Team's name</label>
                        <TextInput name="name" id="name" required
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="teamLeaderid">Team leader</label>
                          <SelectGroup name="teamLeaderid" id="teamLeaderid"
                              required>
                              <option value="">-- Select one --</option>
                              { 
                                this.state.employees.map(employee => <option value={employee._id} key={employee._id}>{employee.name} {employee.surname} </option>)
                              }
                          </SelectGroup>
                      </div>
                    </div>


                    <hr className="mt-4 mb-5" />
 

                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                      <label htmlFor="mision">Mision <small className="text-muted">(optional)</small></label>
                      <TextInput name="mision" id="mision" multiline 
                          value={this.state.mision}
                          onChange={this.handleChange}
                          rows="4"/>
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                      <label htmlFor="vission">vission <small className="text-muted">(optional)</small></label>
                      <TextInput name="vission" id="vission" multiline 
                          value={this.state.vission}
                          onChange={this.handleChange}
                          rows="4"/>
                      </div>
                    </div>

                    <hr className="mt-4 mb-5" />


                    <label>Select employees</label>

                    <SelectEmployeeTable 
                      {...this.state} 
                      updateKeyword={this.updateKeyword} 
                      getAllEmployees={this.getAllEmployees}
                      updateSelectEmployees={this.updateSelectEmployees}
                      checkOrNot={this.checkOrNot}
                      />


                    <div className="form-group pt-4  mb-6">
                        <button className="btn btn-primary mr-3" style={{width: '100%'}} type="submit" disabled={this.state.submitDisabled ? "disabled": null}>Save team</button>
                        
                    </div>
                </ValidationForm>

                </div>
            </div>
            </div>
        </div>
    )
  }
}
export default withAuth(TeamAdd);
