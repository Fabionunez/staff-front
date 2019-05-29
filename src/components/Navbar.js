import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import NavBarMenu from './NavBarMenu';
import companyService from '../lib/company-service';

import logo from '../img/logo.svg';

class Navbar extends Component {
  state ={
    showMenu: false,
    classMenu: "collapse navbar-collapse",
    logo: ""
  }

  componentDidMount(){

    companyService.logoView(this.props.user.companyID)
    .then((company) => {
      console.log(company.imageUrl);
      if(company.imageUrl !== undefined){
        this.setState({logo: company.imageUrl})
      }else{

        this.setState({logo: "/img/logo.svg"})
      }

    })
    .catch((err) => console.log(err))

  }

  toogleMenu = () =>{
    console.log(this.state.showMenu);
    if(this.state.showMenu === false){
      this.setState({showMenu:true, classMenu: "collapse navbar-collapse show menuheight" })
    }else{
      this.setState({showMenu:false, classMenu: "collapse navbar-collapse"})
    }
  }

  clickMenuItem = () =>{
    this.setState({showMenu:false, classMenu: "collapse navbar-collapse"})
    console.log("in the function clickMenuItem");
    console.log(this.state.classMenu);
  }


  render(){
    const pathname = this.props.pathname;

    
    const {user, logout } = this.props;

    return(
    <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        
        <div className="container-fluid">

          <button onClick={this.toogleMenu} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to="/" className="navbar-brand" href="index.html">
            <img src={logo} className="navbar-brand-img mx-auto" alt="..." />
          </Link>

          <div className="navbar-user d-md-none">
            <div className="dropdown">        
              <Link  to={`/employee/edit/${user._id}`} id="sidebarIcon" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar avatar-sm">
                  <img src={user.imageUrl} className="avatar-img rounded-circle" alt="..." />
                </div>
              </Link>
            </div>
            
          </div>
          
          <NavBarMenu {...this.props} classMenu={this.state.classMenu} toogleMenu={this.toogleMenu} clickMenuItem={this.clickMenuItem} />
        </div>
      </nav>
    )}

}

export default withAuth(Navbar);


              {/* <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon">
                <a href="profile-posts.html" className="dropdown-item">Profile</a>
                <a href="settings.html" className="dropdown-item">Company</a>
                <hr className="dropdown-divider" />
                <a href="sign-in.html"  onClick={logout} className="dropdown-item">Logout</a>
              </div> */}