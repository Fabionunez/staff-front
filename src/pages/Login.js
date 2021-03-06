import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';
import Logo from '../img/logo.svg';


class Login extends Component {
  state = {
      username: "",
      password: "",
      immediate: false
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
        <div className="row justify-content-center  border-top border-top-2 border-primary align-items-center p-4" style={{height:"100vh"}} >
            <div className="col-12 col-md-5 col-xl-4 my-5 text-center">
                <img src={Logo} className="text-center pb-5" style={{width:"300px"}} alt="..." />

                <h1 className="display-4 text-center mb-3">Sign in</h1>
                <p className="text-muted text-center mb-5">Enter in your private dashboard.</p>
            <ValidationForm 
                immediate={this.state.immediate} 
                className="text-left" 
                onSubmit={this.handleSubmit} 
                onErrorSubmit={this.handleErrorSubmit}>
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
                    <button className="btn btn-primary" style={{width: '100%'}}  type="submit" >Sign in</button>
                </div>
            </ValidationForm>
            <div className="text-center">
              <small className="text-muted text-center">
                Are you a human resource manager? <Link to={"/signup"}> Sign up</Link>.
              </small>
            </div>
            </div>
        </div>
      )
  }
}

export default withAuth(Login);

