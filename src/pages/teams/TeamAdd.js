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
    id: "",
    name: "",
    usersIds: [],
    usersIdsObj: [],
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


  updateSelectEmployees = (id) =>{

    var cloneUsersIds = this.state.usersIds.slice(0);

    let found = this.state.usersIds.find(function(element) { 
      return element === id;
    }); 

    if(found === undefined){ // Si el id no estaba en la list de usuarios del equipo
      cloneUsersIds.push(id);
      this.setState({usersIds: cloneUsersIds});
    }else{ // Si el id estaba en la lista de usuarios del equipo
      cloneUsersIds.splice(cloneUsersIds.indexOf(id),1);
      this.setState({usersIds: cloneUsersIds})
    }

  }


  render() {
    const {  user } = this.props; 


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
                              required onChange={this.handleChange}>
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
                      <label htmlFor="mission">Mission <small className="text-muted">(optional)</small></label>
                      <TextInput name="mission" id="mission" multiline 
                          value={this.state.mission}
                          onChange={this.handleChange}
                          rows="4"/>
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                      <label htmlFor="vision">vision <small className="text-muted">(optional)</small></label>
                      <TextInput name="vision" id="vision" multiline 
                          value={this.state.vision}
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
