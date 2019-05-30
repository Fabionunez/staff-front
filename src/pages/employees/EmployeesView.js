import React, { Component } from 'react'
import { withAuth } from '../../providers/AuthProvider';

import employeeService from '../../lib/employee-service';
import Navbar from '../../components/Navbar';
import TopBar from '../../components/TopBar';


class EmployeesView extends Component {
    state = {
        username: "", 
        name: "",
        surname: "",
        title: "",
        companyPhone: "",
        dateStart: "",
        birthDate: "",
        managerID: "",
        imageUrl: ""
      }
  
  
      componentDidMount(){
    
          const { id } = this.props.match.params
  
          employeeService.employeeView(id)
          .then((employee) => {
  
              if(employee.permissions === false){ // Check if you have permissions to see this user
                this.props.history.push("/employees")
              
              }else{
                if(employee.message === "error"){ //Check if the email you are editing already exist
                  this.props.history.push("/404")
                }else{
                  this.setState( {
                      username: employee.username,
                      name: employee.name,
                      surname: employee.surname,
                      title: employee.title,
                      companyPhone: employee.companyPhone,
                      dateStart: employee.dateStart,
                      birthDate: employee.birthDate,
                      managerID: employee.managerID,
                      imageUrl: employee.imageUrl
  
                  });
               } 
              }
          })
          .catch(error => console.log(error) )
      }
  

    render () {
      const {  user } = this.props; 

        return (
        <div>
          <Navbar />
          <div  className="main-content">
            <TopBar {...user} />




            <div className="container pt-4 d-flex justify-content-center" >


                  <div className="card" style={{maxWidth: '600px'}}>
                  <img src="https://res.cloudinary.com/fabionunez/image/upload/v1558809492/staff/background_ple0qi.png" alt="..." className="card-img-top" />
                    <div className="card-body text-center pb-0">
                      <a href="profile-posts.html" className="avatar-custom card-avatar card-avatar-top-custom" style={{}}>
                        <img src={this.state.imageUrl} className="avatar-img rounded-circle border border-5 border-card" alt="..." />
                      </a>
                      <h2 className="card-title"><a href="profile-posts.html" style={{}}>{this.state.name} {this.state.surname}</a></h2>
                      <p><small>{this.state.title}</small></p>
                      <hr />
                    </div>

                    
                    <div className="card-body pt-0">
                      
                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="mb-0">Birthday</h5>
                        </div>
                        <div className="col-auto">
                          <span className="small text-muted">{this.state.birthDate ? this.state.birthDate: "Not introduced"}</span>
                        </div>
                      </div>
                      <hr />

                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="mb-0">Joined</h5>
                        </div>
                        <div className="col-auto">
                          <span className="small text-muted">{this.state.dateStart}</span>
                        </div>
                      </div>
                      <hr />

                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="mb-0">E-mail</h5>
                        </div>
                        <div className="col-auto">
                          <span className="small text-muted">{this.state.username}</span>
                        </div>
                      </div>
                      <hr />

                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="mb-0">Office phone</h5>
                        </div>
                        <div className="col-auto">
                          <span className="small text-muted">{this.state.companyPhone ? this.state.companyPhone: "Not introduced"}</span>
                        </div>
                      </div>
                      <hr />

                      <div className="row align-items-center">
                        <div className="col">
                        <a className="btn btn-primary d-block" href={`mailto:{this.state.username}`} role="button">Contact</a>
                        </div>
      
                      </div> {/* / .row */}
                    </div>

                  </div>

            </div>


          </div>
        </div>
        )
    }
}

export default withAuth(EmployeesView);