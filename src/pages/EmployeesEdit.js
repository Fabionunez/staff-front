import React, { Component } from 'react'
import { ValidationForm, TextInput, FileInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';

import employeeService from '../lib/employee-service';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';


class EmployeesEdit extends Component {
    state = {
      username: "", //mail
      password: "",
      name: "",
      surname: "",
      title: "",
      companyPhone: "",
      dateStart: "",
      birthDate: "",
      gender: "",
      nationality: "",
      phone: "",
      photo: "",
      identificationNumber: "",
      socialSecurityNumber: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
      emergencyContact: "",
      emergencyPhone: "",
      managerID: "",
      imageUrl: "",
      submitDisabled: false
    }


    componentDidMount(){
        const { id } = this.props.match.params

        employeeService.employeeView(id)
        .then((employee) => {
            this.setState( {
                name: employee.name,
                surname: employee.surname,
                title: employee.title,
                username: employee.username,
                imageUrl: employee.imageUrl
            });
          //console.log(employee.name);
          //window.location.href="/employees";
        })
        .catch(error => console.log(error) )
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();

        const name = this.state.name;
        const surname = this.state.surname;
        const username = this.state.username;
        const title = this.state.title;
        const password = this.state.password;
        const id = this.props.match.params.id;
        const imageUrl = this.state.imageUrl;


        employeeService.employeeUpdate({ id, name, surname, imageUrl, title, username, password })
        .then((employee) => {
            this.props.history.push("/employees")

        })
        .catch(error => console.log(error) )

          
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    matchPassword = (value) => {
        return value && value === this.state.password;   
    }

    fileOnchange = (event) => {
      const file = event.target.files[0];
      const uploadData = new FormData()
      uploadData.append('photo', file)

      this.setState({submitDisabled: true})
  
      employeeService.imageUpload(uploadData)
      .then((imageUrl) => {
        this.setState({
          imageUrl,
          submitDisabled: false,
          submitText: "Save changes"
        })
      })
      .catch((error) => console.log(error))
    }

    render () {
      const {  user } = this.props; 

        return (
        <div>
          <Navbar />
          <div  className="main-content">
            <TopBar {...user} />
            <div className="main-content-padding">
            <div class="header-body mb-5">
                <h6 class="header-pretitle">
                Edit
                </h6>
                <h1 class="header-title">
                Employee
                </h1>
            </div>  

            <div className="container p-0 m-0" >

                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} style={{"max-width": '350px'}}>
                    <input type="hidden" id="id" name="id" value={this.props.match.params.id} />
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <TextInput name="name" id="name" required
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <TextInput name="surname" id="surname" minLength="4"
                            value={this.state.surname}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <TextInput name="title" id="title" minLength="4"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <TextInput name="username" id="username" type="email" 
                            validator={validator.isEmail} 
                            errorMessage={{validator:"Please enter a valid email"}}
                            value={this.state.username}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New password</label>
                        <TextInput name="password" id="password" type="text"  
                            pattern="(?=.*[A-Z]).{6,}"
                            errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <TextInput name="username" id="username" type="email" 
                            validator={validator.isEmail} 
                            errorMessage={{validator:"Please enter a valid email"}}
                            value={this.state.username}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Profile image</label>
                        <FileInput 
                            name="imageUrl" 
                            id="imageUrl" 
                            required
                            onChange={this.fileOnchange} 
                            fileType={["jpg", "png", "jpeg"]}
                            maxFileSize="1000 kb" 
                            errorMessage={
                                { required: "Please upload a file", 
                                fileType:"Only pdf and excel is allowed", 
                                maxFileSize: "Max file size is 1000 kb"
                                }
                            }/>
                    </div>
                    <div className="form-group pt-2">
                        <button className="btn btn-primary mr-3" style={{width: '100%'}} type="submit" disabled={this.state.submitDisabled ? "disabled": null}>Save changes</button>
                        
                    </div>
                </ValidationForm>

                </div>
            </div>
            </div>
        </div>
        )
    }
}

export default withAuth(EmployeesEdit);