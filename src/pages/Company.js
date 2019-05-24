import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { withAuth } from '../providers/AuthProvider';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import companyService from '../lib/company-service';


class Company extends Component {
    state = {
      tradeName: "",
      corporateName: "",
      taxIdNumber: "",
      address: "",
      city: "",
      postalCode: "",
      province: "",
      country: ""
    }


    componentDidMount(){
      
      const { user } = this.props


      companyService.companyView(user._id)
      .then((company) => {

        if(company === null){

            this.props.history.push("/404")

        }else{

          this.setState( {
            tradeName: company.tradeName,
            corporateName: company.corporateName,
            taxIdNumber: company.taxIdNumber,
            address: company.address,
            city: company.city,
            postalCode: company.postalCode,
            province: company.province,
            country: company.country,
            confirm: false
          });

        }

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

        const tradeName = this.state.tradeName;
        const corporateName = this.state.corporateName;
        const taxIdNumber = this.state.taxIdNumber;
        const address = this.state.address;
        const city = this.state.city;
        const postalCode = this.state.postalCode;
        const province = this.state.province;  
        const country = this.state.country;  
        

        companyService.companyUpdate({tradeName, corporateName, taxIdNumber, address, city, postalCode, province, country})
          .then(() => {
            window.scroll(0, window.pageYOffset - this.props.scrollStepInPx)
            this.props.history.push("/company")
            this.setState({confirm:true})


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

        return (
        <div>
         <Navbar pathname={this.props.location.pathname} />


         
          <div  className="main-content">

            <TopBar {...user} />
            <div className="main-content-padding">
                <div className="header-body mb-5">
                    <h6 className="header-pretitle">Edit</h6>
                    <h1 className="header-title">Company</h1>
                </div>  

                <div className="container p-0 m-0" >

            {this.state.confirm ? <div class="alert alert-success" role="alert" style={{"max-width": '350px'}}>Changes saved!</div> : ""}
            
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} style={{width: '350px'}}>
                <div className="form-group">
                    <label htmlFor="corporateName">Corporate name</label>
                    <TextInput name="corporateName" id="corporateName" required
                        value={this.state.corporateName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tradeName">Trade name</label>
                    <TextInput name="tradeName" id="tradeName" 
                        value={this.state.tradeName}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="taxIdNumber">Tax ID number</label>
                    <TextInput name="taxIdNumber" id="taxIdNumber" 
                        value={this.state.taxIdNumber}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Adress</label>
                    <TextInput name="address" id="address" 
                        value={this.state.address}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal code</label>
                    <TextInput name="postalCode" id="postalCode" 
                        value={this.state.postalCode}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <TextInput name="city" id="city" 
                        value={this.state.city}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="province">Province</label>
                    <TextInput name="province" id="province" 
                        value={this.state.province}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <TextInput name="country" id="country" 
                        value={this.state.country}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" type="submit" style={{width: '100%'}} >Save changes</button>
                </div>
            </ValidationForm>
            </div>
            </div>
          </div>
        </div>
        )
    }
}

export default withAuth(Company);