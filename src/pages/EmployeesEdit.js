import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';
import employeeService from '../lib/employee-service';


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
      companyID: ""
    }


    componentDidMount(){
        const { id } = this.props.match.params

        employeeService.employeeView(id)
        .then((employee) => {
            this.setState( {
                name: employee.name,
                surname: employee.surname,
                username: employee.username
            
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
        //alert(JSON.stringify(formData, null, 2));
        // const name = this.state.name;
        // const surname = this.state.surname;
        // const username = this.state.username;
        // const password = this.state.password;




          
    }

    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    matchPassword = (value) => {
        return value && value === this.state.password;   
    }

    render () {
        return (
          <div className="container" style={{width: '350px'}}>
            
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
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
                    <label htmlFor="username">Email</label>
                    <TextInput name="username" id="username" type="email" 
                        validator={validator.isEmail} 
                        errorMessage={{validator:"Please enter a valid email"}}
                        value={this.state.username}
                        onChange={this.handleChange}
                        />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" style={{width: '100%'}}  type="submit" >Add a new employee</button>
                </div>
            </ValidationForm>

          </div>
        )
    }
}

export default withAuth(EmployeesEdit);