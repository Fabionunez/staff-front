import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';


class Company extends Component {
    state = {
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        corporateName: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();

        const name = this.state.firstName;
        const surname = this.state.surname;
        const username = this.state.username;
        const password = this.state.password;
        const corporateName = this.state.corporateName;

        this.props.signup({ name, surname, corporateName, username, password })
          .then(() => {
            this.setState({
              name: "",
              surname: "",
              email: "",
              password: "",
              confirmPassword: "",
              corporateName: ""
            });
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
                    <label htmlFor="password">Password</label>
                    <TextInput name="password" id="password" type="password" required 
                        pattern="(?=.*[A-Z]).{6,}"
                        errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <TextInput name="confirmPassword" id="confirmPassword" type="password" required 
                        validator={this.matchPassword}
                        errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="corporateName">Company name</label>
                    <TextInput name="corporateName" id="corporateName" required
                        value={this.state.company}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary"  type="submit" >Submit</button>
                </div>
            </ValidationForm>
            <p>Already have account? 
             <Link to={"/login"}> Login</Link>
            </p>
          </div>
        )
    }
}

export default withAuth(Company);