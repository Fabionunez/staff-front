import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';


class Login extends Component {
  state = {
      username: "",
      password: ""
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit = (e, formData, inputs) => {
      e.preventDefault();

      const username = this.state.username;
      const password = this.state.password;


      this.props.login({ username, password })
        .then(() => {
          this.setState({
            username: "",
            password: ""
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
                  <TextInput name="username" id="username" type="email" 
                      placeholder="E-mail"
                      validator={validator.isEmail} 
                      errorMessage={{validator:"Please enter a valid email"}}
                      value={this.state.username}
                      onChange={this.handleChange}
                      />
              </div>
              <div className="form-group">
                  <TextInput name="password" id="password" type="password" required 
                      placeholder="Password"
                      pattern="(?=.*[A-Z]).{6,}"
                      errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                      value={this.state.password}
                      onChange={this.handleChange}
                  />
              </div>
              <div className="form-group">
                  <button className="btn btn-primary" style={{width: '100%'}}  type="submit" >Submit</button>
              </div>
          </ValidationForm>
          <p>Do you need an account? 
           <Link to={"/signup"}> Signup</Link>
          </p>
        </div>
      )
  }
}

export default withAuth(Login);