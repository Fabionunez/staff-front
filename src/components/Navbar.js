import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import NavBarMenu from './NavBarMenu';


class Navbar extends Component {
  state ={
    showMenu: false,
    classMenu: "collapse navbar-collapse"
  }



  toogleMenu = () =>{
    if(this.state.showMenu === false){
      this.setState({showMenu:true, classMenu: "collapse navbar-collapse show menuheight" })
    }else{
      this.setState({showMenu:false, classMenu: "collapse navbar-collapse"})
    }
  }

  clickMenuItem = () =>{
    this.setState({showMenu:false, classMenu: "collapse navbar-collapse"})
  }


  render(){

    
    const { user } = this.props;

    return(
    <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        
        <div className="container-fluid">

          <button onClick={this.toogleMenu} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to="/" className="navbar-brand" href="index.html">
            <img src="/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
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