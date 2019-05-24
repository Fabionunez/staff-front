import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import IconUsers from 'react-feather/dist/icons/users';
import IconBriefcase from 'react-feather/dist/icons/briefcase';
import IconGrid from 'react-feather/dist/icons/grid';
import IconSettings from 'react-feather/dist/icons/settings';
import IconLogout from 'react-feather/dist/icons/log-out';
import IconStats from 'react-feather/dist/icons/pie-chart';

import Logo from '../img/logo.svg';

class Navbar extends Component {

  handleSidebar = () =>{
    console.log("sidebar");
  }

  render(){
    const {user, logout } = this.props;

    return(
    <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        <div className="container-fluid">

          <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={this.handleSidebar} data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to="/" className="navbar-brand" href="index.html">
            <img src={Logo} className="navbar-brand-img mx-auto" alt="..." />
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
          
          <div className="collapse navbar-collapse" id="sidebarCollapse">
            <form className="mt-4 mb-3 d-md-none">
              <div className="input-group input-group-rounded input-group-merge">
                <input type="search" className="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search" />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <span className="fe fe-search"></span>
                  </div>
                </div>
              </div>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/employees" role="button" aria-expanded="true" aria-controls="sidebarDashboards">
                  <IconUsers size={25} className="pr-2"/> Employees
                </Link>
              </li>
              {user.isAdmin ? <li className="nav-item">
                <Link to="/company" className="nav-link ">
                  <IconBriefcase size={25} className="pr-2"/> Company
                </Link>
              </li> : ""}
              
              {user.isAdmin ? 
              <li className="nav-item">
                <Link to="/teams" className="nav-link">
                  <IconGrid size={25} className="pr-2"/> Teams <span className="badge badge-soft-success ml-auto">soon</span>
                </Link>
              </li>
              : ""}

              {user.isAdmin ?
              <li className="nav-item">
                <Link to="/stats" className="nav-link">
                  <IconStats size={25} className="pr-2"/> Stats <span className="badge badge-soft-success ml-auto">soon</span>
                </Link>
              </li>
              : ""}

              <li className="nav-item">
                <Link to={`/employee/edit/${user._id}`} className="nav-link">
                  <IconSettings size={25} className="pr-2"/> Settings
                </Link>
              </li>
              <li className="nav-item">
                <a href="javascript:;" className="nav-link" onClick={logout}>
                  <IconLogout size={25} className="pr-2"/> Logout
                </a>
              </li>
            </ul>
          </div>
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