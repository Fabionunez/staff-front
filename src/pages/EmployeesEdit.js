import React, { Component } from 'react'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';
import employeeService from '../lib/employee-service';
import Navbar from '../components/Navbar';


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
      managerID: ""
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
        const name = this.state.name;
        const surname = this.state.surname;
        const username = this.state.username;
        const password = this.state.password;
        const id = this.props.match.params.id;

        //console.log(name, surname, username, password, id);

        employeeService.employeeUpdate({ id, name, surname, username, password })
        .then((employee) => {
            // this.setState( {
            //     name: employee.name,
            //     surname: employee.surname,
            //     username: employee.username
            
            // });
            // console.log(employee.name);
            //console.log("redirecting");
            window.location.href="/employees";
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
        return (
        <div>
          <Navbar />
          <div  className="main-content p-4">
            <div class="pb-4">
                <h6 class="header-pretitle">
                Edit
                </h6>
                <h1 class="header-title">
                Employee
                </h1>
            </div>  

            <div className="container p-0 m-0" >

                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} style={{width: '350px'}}>
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
                        <button className="btn btn-primary" style={{width: '100%'}}  type="submit" >Save changes</button>
                    </div>
                </ValidationForm>

                </div>
            </div>
        </div>
        )
    }
}

export default withAuth(EmployeesEdit);