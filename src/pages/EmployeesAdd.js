import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';
import employeeService from '../lib/employee-service';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';


class EmployeesAdd extends Component {
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
      companyID: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();
        //alert(JSON.stringify(formData, null, 2));
        const name = this.state.name;
        const surname = this.state.surname;
        const username = this.state.username;
        const title = this.state.title;
        const password = this.state.password;


        employeeService.employeeAdd({ name, surname, title, username, password })
          .then(() => {
            this.setState({
              name: "",
              surname: "",
              title:"",
              email: "",
              password: ""
            });
            // window.location.href="/employees";
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

    render () {
        const {  user } = this.props; 

        //console.log(this.props)

        return (
        <div>
          <Navbar />

         
          <div  className="main-content">

            <TopBar {...user} />
            <div className="p-4">
                <div className="pb-4">
                    <h6 className="header-pretitle">Add</h6>
                    <h1 className="header-title">Employee</h1>
                </div>  

                <div className="container p-0 m-0" >
                
                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} style={{width: '350px'}}>
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
                        <label htmlFor="password">Password</label>
                        <TextInput name="password" id="password" type="text" required 
                            pattern="(?=.*[A-Z]).{6,}"
                            errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" style={{width: '100%'}}  type="submit" >Add employee</button>
                    </div>
                </ValidationForm>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default withAuth(EmployeesAdd);
// export default withAuth(EmployeesAdd);