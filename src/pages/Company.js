import React, { Component } from 'react'
import { ValidationForm, TextInput, FileInput } from 'react-bootstrap4-form-validation';
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
      country: "",
      imageUrl: "",
      submitDisabled: false,

    }


    componentDidMount(){
      
      const { user } = this.props


      companyService.companyView(user._id)
      .then((company) => {

        if(company === null){

            this.props.history.push("/404")

        }else{
          console.log("imageUrl :", this.state.imageUrl);
          this.setState( {
            tradeName: company.tradeName,
            corporateName: company.corporateName,
            taxIdNumber: company.taxIdNumber,
            address: company.address,
            city: company.city,
            postalCode: company.postalCode,
            province: company.province,
            country: company.country,
            imageUrl: company.imageUrl,
            confirm: false
          });
          console.log("imageUrl :", this.state.imageUrl);

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

        const { 
          tradeName, 
          corporateName, 
          taxIdNumber, 
          address, city, 
          postalCode, 
          province, 
          country,
          imageUrl
         } = this.state;

        

        companyService.companyUpdate({tradeName, 
                                      corporateName, 
                                      taxIdNumber, 
                                      address, 
                                      city, 
                                      postalCode, 
                                      province, 
                                      country,
                                      imageUrl})
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

    fileOnchange = (event) => {
      const file = event.target.files[0];
      const uploadData = new FormData()
      uploadData.append('photo', file)

      this.setState({submitDisabled: true})
  
      companyService.imageUpload(uploadData)
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
         <Navbar pathname={this.props.location.pathname} />


         
          <div  className="main-content">

            <TopBar {...user} />
            <div className="main-content-padding">
                <div className="header-body mb-5">
                    <h6 className="header-pretitle">Edit</h6>
                    <h1 className="header-title">Company</h1>
                </div>  

                <div className="container p-0 m-0" >

            {this.state.confirm ? <div class="alert alert-success" role="alert" style={{"maxWidth": '800px'}}>Changes saved!</div> : ""}
            
            <ValidationForm onSubmit={this.handleSubmit} onErrorSubmit={this.handleErrorSubmit} style={{maxWidth: '800px'}}>
                

            <div className="row">
              <div className="col" >
                  <div className="company-photo">
                      <img src={this.state.imageUrl === "" ? "https://res.cloudinary.com/fabionunez/image/upload/v1558793227/staff/user_swbbnl.svg": this.state.imageUrl}  alt="..." />
                  </div>
              </div>
              <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0 pt-3">
                <label htmlFor="imageUrl">Company logo  <small className="text-muted">(optional)</small></label>
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
                  <label htmlFor="corporateName">Corporate name</label>
                    <TextInput name="corporateName" id="corporateName" required
                        value={this.state.corporateName}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                  <label htmlFor="tradeName">Trade name <small className="text-muted">(optional)</small></label>
                    <TextInput name="tradeName" id="tradeName" 
                        value={this.state.tradeName}
                        onChange={this.handleChange}
                    />
                </div>
              </div>          
              <hr className="mt-4 mb-5" />  
                



             
          

              <div className="row">
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                  <label htmlFor="address">Adress <small className="text-muted">(optional)</small></label>
                    <TextInput name="address" id="address" 
                        value={this.state.address}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                <label htmlFor="postalCode">Postal code <small className="text-muted">(optional)</small></label>
                    <TextInput name="postalCode" id="postalCode" 
                        value={this.state.postalCode}
                        onChange={this.handleChange}
                    />
                </div>
              </div> 
              <div className="row">
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                  <label htmlFor="city">City <small className="text-muted">(optional)</small></label>
                    <TextInput name="city" id="city" 
                        value={this.state.city}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                  <label htmlFor="province">Province <small className="text-muted">(optional)</small></label>
                    <TextInput name="province" id="province" 
                        value={this.state.province}
                        onChange={this.handleChange}
                    />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                    <label htmlFor="province">Province</label>
                    <TextInput name="province" id="province" 
                        value={this.state.province}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                    <label htmlFor="country">Country</label>
                    <TextInput name="country" id="country" 
                        value={this.state.country}
                        onChange={this.handleChange}
                    />
                </div>
              </div>
              <hr className="mt-4 mb-5" /> 


              <div className="row">
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">
                  <label htmlFor="taxIdNumber">Tax ID number <small className="text-muted">(optional)</small></label>
                    <TextInput name="taxIdNumber" id="taxIdNumber" 
                        value={this.state.taxIdNumber}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-12 col-md-6 pr-lg-4 pr-sm-0">

                </div>
              </div> 
              <hr className="mt-4 mb-5" /> 

                <div className="form-group">
                    <button className="btn btn-primary" type="submit" style={{width: '100%'}}  disabled={this.state.submitDisabled ? "disabled": null} >Save changes</button>
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