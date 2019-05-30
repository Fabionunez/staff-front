import React, { Component } from 'react'
import { ValidationForm, TextInput, SelectGroup, Radio, FileInput } from "react-bootstrap4-form-validation"
import validator from 'validator';
import { withAuth } from '../../providers/AuthProvider';

import employeeService from '../../lib/employee-service';

import Navbar from '../../components/Navbar';
import TopBar from '../../components/TopBar';

import MaskWithValidation from '../../components/employees/MaskWithValidation'



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
        identificationNumber: "",
        socialSecurityNumber: "",
        address: "",
        city: "",
        postalCode: "",
        province: "",
        country: "",
        emergencyContact: "",
        emergencyPhone: "",
        managerID: "",
        imageUrl: "",
        submitDisabled: false,
        userExists: false,
        employees: []
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e, formData, inputs) => {
        e.preventDefault();

        const { 
            username,
            password,
            name,
            surname,
            title,
            companyPhone,
            dateStart,
            birthDate,
            gender,
            nationality,
            phone,
            identificationNumber,
            socialSecurityNumber,
            address,
            city,
            postalCode,
            province,
            country,
            emergencyContact,
            emergencyPhone,
            managerID,
            imageUrl } = this.state;


        employeeService.employeeAdd({ 
            username,
            password,
            name,
            surname,
            title,
            companyPhone,
            dateStart,
            birthDate,
            gender,
            nationality,
            phone,
            identificationNumber,
            socialSecurityNumber,
            address,
            city,
            postalCode,
            province,
            country,
            emergencyContact,
            emergencyPhone,
            managerID,
            imageUrl  })
          .then((employee) => {
            if(employee.userExists){
              window.scrollTo( 0, 0 );
              this.setState({userExists: employee.userExists})
  
            }else{
              this.props.history.push("/employees")
            }
          })
          .catch(error => console.log(error) )

          
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


    handleErrorSubmit = (e, formData, errorInputs) => {
        console.error(errorInputs)
    }

    matchPassword = (value) => {
        return value && value === this.state.password;   
    }

    handleChangeDates = (date) => {
      this.setState({
        birthDate: date
      });
    }

    componentDidMount = () =>{

      employeeService.employeesList()
      .then((response) =>{
          this.setState({employees: response})
      })
      .catch((err) => console.log(err))
      
    }

    render () {
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
                New employee
                </h1>
            </div>  
            <div className="container p-0 m-0" >
                <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} style={{maxWidth: '800px'}}>
                    <input type="hidden" id="id" name="id" value={this.props.match.params.id} />
                    <div className="row">
                      <div className="col" style={{maxWidth: '150px'}} >
                          <div className="avatar avatar-xxl">
                              <img src={this.state.imageUrl === "" ? "https://res.cloudinary.com/fabionunez/image/upload/v1558793227/staff/user_swbbnl.svg": this.state.imageUrl}  alt="..." className="avatar-img rounded-circle" />
                          </div>
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0 pt-3">
                        <label htmlFor="imageUrl">Profile image  <small className="text-muted">(optional)</small></label>
                        <FileInput 
                            name="imageUrl" 
                            id="imageUrl" 
                            onChange={this.fileOnchange} 
                            fileType={["jpg", "png", "jpeg"]}
                            maxFileSize="1000 kb" 
                            errorMessage={
                                { fileType:"Only pdf and excel is allowed", 
                                maxFileSize: "Max file size is 1000 kb"
                                }
                            }/>
                        <small className="form-text text-muted pt-3">The image file should be under 1Mb</small>
                      </div>
                    </div>
                    <hr className="mt-4 mb-5" />



                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="name">Name</label>
                        <TextInput name="name" id="name" required
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="surname">Surnames</label>
                        <TextInput name="surname" id="surname" minLength="4"
                            value={this.state.surname}
                            onChange={this.handleChange}
                        />
                      </div>
                    </div>




                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="dateStart">Start date</label>
                        <MaskWithValidation name="dateStart" className="form-control" required 
                            validator={(value) => value.search("_")<0}
                            value={this.state.dateStart}
                            onChange={this.handleChange}
                            errorMessage={{validator: "Please enter dd/mm/yyyy"}}
                            mask={[/[0-3]/, /[1-9]/,  '/', /[0-1]/, /[0-9]/, '/', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                            />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label className="pb-2">Gender</label>
                        <Radio.RadioGroup name="gender" required valueSelected={this.state.gender} onChange={this.handleChange}>>
                            <Radio.RadioItem id="male" name="male" value="male" label="Male"  /> 
                            <Radio.RadioItem id="female" name="female" value="female" label="Female" />
                        </Radio.RadioGroup>
                      </div>
                    </div>
                    <hr className="mt-4 mb-5" />



                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="title">Title</label>
                        <TextInput name="title" id="title" minLength="4"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="companyPhone">Company phone <small className="text-muted">(optional)</small></label>
                        <MaskWithValidation name="companyPhone" className="form-control"
                            validator={(value) => value.search("_")<0}
                            value={this.state.companyPhone}
                            onChange={this.handleChange}
                            errorMessage={{validator: "Use this format 000 000 000"}}
                            mask={[/[0-9]/, /[0-9]/, /[0-9]/,  ' ', /[0-9]/, /[0-9]/,/[0-9]/, ' ',  /[0-9]/, /[0-9]/,/[0-9]/,]}
                            />
                      </div>
                    </div>



                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="username">Email</label>
                        <TextInput name="username" id="username" type="email" 
                            validator={validator.isEmail} 
                            errorMessage={{validator:"Please enter a valid email"}}
                            value={this.state.username}
                            onChange={this.handleChange}
                            />
                        {this.state.userExists ? <small className="text-danger">User already exist</small>:""}  
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                          <label htmlFor="password">Create a password</label>
                          <TextInput name="password" id="password" type="password"
                              required
                              pattern="(?=.*[A-Z]).{6,}"
                              errorMessage={{required:"Password is required", pattern: "Password should be at least 6 characters and contains at least one upper case letter"}}
                              value={this.state.password}
                              onChange={this.handleChange}
                          />
                      </div>
                    </div>
                    <hr className="mt-4 mb-5" />


                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="identificationNumber">Identification Number <small className="text-muted">(optional)</small></label>
                        <TextInput name="identificationNumber" id="identificationNumber"
                            value={this.state.identificationNumber}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="socialSecurityNumber">Social security Number <small className="text-muted">(optional)</small></label>
                        <TextInput name="socialSecurityNumber" id="socialSecurityNumber"
                            value={this.state.socialSecurityNumber}
                            onChange={this.handleChange}
                        />
                      </div>
                    </div>



                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="phone">Personal phone <small className="text-muted">(optional)</small> </label>
                        <MaskWithValidation name="phone" className="form-control"
                            validator={(value) => value.search("_")<0}
                            value={this.state.phone}
                            onChange={this.handleChange}
                            errorMessage={{validator: "Use this format 000 000 000"}}
                            mask={[/[0-9]/, /[0-9]/, /[0-9]/,  ' ', /[0-9]/, /[0-9]/,/[0-9]/, ' ',  /[0-9]/, /[0-9]/,/[0-9]/,]}
                            />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="birthDate">Birth date  <small className="text-muted">(optional)</small></label>
                        <MaskWithValidation name="birthDate" className="form-control" 
                            validator={(value) => value.search("_")<0}
                            value={this.state.birthDate}
                            onChange={this.handleChange}
                            errorMessage={{validator: "Please enter dd/mm/yyyy"}}
                            mask={[/[0-3]/, /[1-9]/,  '/', /[0-1]/, /[0-9]/, '/', /[1-2]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                            />
                      </div>
                    </div>
                    <hr className="mt-4 mb-5" />


                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="address">Address <small className="text-muted">(optional)</small></label>
                        <TextInput name="address" id="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="city">City <small className="text-muted">(optional)</small></label>
                        <TextInput name="city" id="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                      </div>
                    </div>


                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="postalCode">PostalCode <small className="text-muted">(optional)</small></label>
                        <TextInput name="postalCode" id="postalCode"
                            value={this.state.postalCode}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="province">State <small className="text-muted">(optional)</small></label>
                        <TextInput name="province" id="province"
                            value={this.state.province}
                            onChange={this.handleChange}
                        />
                      </div>
                    </div>


                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="country">Country <small className="text-muted">(optional)</small></label>
                        <TextInput name="country" id="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="nationality">Nationality <small className="text-muted">(optional)</small></label>
                          <TextInput name="nationality" id="nationality"
                              value={this.state.nationality}
                              onChange={this.handleChange}
                          />
                      </div>
                    </div>
                    <hr className="mt-4 mb-5" />



                    <div className="row">
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="emergencyContact">Emergency contact person <small className="text-muted">(optional)</small></label>
                        <TextInput name="emergencyContact" id="emergencyContact"
                            value={this.state.emergencyContact}
                            onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                        <label htmlFor="emergencyPhone">Emergency contact person's phone <small className="text-muted">(optional)</small></label>
                        <MaskWithValidation name="emergencyPhone" className="form-control"
                            validator={(value) => value.search("_")<0}
                            value={this.state.emergencyPhone}
                            onChange={this.handleChange}
                            errorMessage={{validator: "Use this format 000 000 000"}}
                            mask={[/[0-9]/, /[0-9]/, /[0-9]/,  ' ', /[0-9]/, /[0-9]/,/[0-9]/, ' ',  /[0-9]/, /[0-9]/,/[0-9]/,]}
                            />
                      </div>
                    </div>
                    <hr className="mt-4 mb-5" />



                    <div className="row">
                      <div className="form-group col-12">
                      <label htmlFor="managerID">Manager</label>
                          <SelectGroup name="managerID" id="managerID"
                              required onChange={this.handleChange}>
                              <option value="">-- Select one --</option>
                              { 
                                this.state.employees.map(employee => <option 
                                                                      value={employee._id} 
                                                                      key={`teamLeaderid-EmployeeAdd-${employee._id}`}
                                                                      selected={this.state.managerID === employee._id.toString() ? "selected" : null}
                                                                      >{employee.name} {employee.surname}  </option>)
                              }
                          </SelectGroup>
                      </div>
                    </div>



                    <div className="form-group pt-4  mb-6">
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

export default withAuth(EmployeesAdd);