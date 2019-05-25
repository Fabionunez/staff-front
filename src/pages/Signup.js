import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';
import Logo from '../img/logo.svg';

class Signup extends Component {
    state = {
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        corporateName: "",
        imageUrl: "https://res.cloudinary.com/fabionunez/image/upload/v1558806598/staff/user2_e4pwrt.svg"

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
        const corporateName = this.state.corporateName;
        const imageUrl = this.state.imageUrl;
    
        this.props.signup({ name, surname, corporateName, username, password, imageUrl })
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
        <div class="row justify-content-center  border-top border-top-2 border-primary">
            <div class="col-12 col-md-5 col-xl-4 my-5  text-center align-items-center">
                <img src={Logo} className="text-center pb-5" style={{width:"300px"}} alt="..." />

                <h1 class="display-4 text-center mb-3">Sign up</h1>
                <p class="text-muted text-center mb-5">Human resource manager toolkit.</p>
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit}>
                <div className="form-group">
                    <TextInput name="name" id="name" required
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <TextInput name="surname" id="surname" minLength="3"
                        placeholder="Surname"
                        value={this.state.surname}
                        onChange={this.handleChange}
                    />
                </div>
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
                    <TextInput name="confirmPassword" id="confirmPassword" type="password" required 
                        placeholder="Confirm Password"
                        validator={this.matchPassword}
                        errorMessage={{required:"Confirm password is required", validator: "Password does not match"}}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <TextInput name="corporateName" id="corporateName" required
                        placeholder="Company name"
                        value={this.state.company}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" style={{width: '100%'}}  type="submit" >Submit</button>
                </div>
            </ValidationForm>
          <div class="text-center">
              <small class="text-muted text-center">
                Already have an account? <Link to={"/"}> Sign in</Link>.
              </small>
            </div>
            </div>
        </div>
        )
    }
}

export default withAuth(Signup);