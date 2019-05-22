import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';
import IconUsers from 'react-feather/dist/icons/users';
import IconBriefcase from 'react-feather/dist/icons/briefcase';
import IconGrid from 'react-feather/dist/icons/grid';
import IconSettings from 'react-feather/dist/icons/settings';
import IconLogout from 'react-feather/dist/icons/log-out';


class Navbar extends Component {
  // render() {
  //   const { isLogged, user, logout } = this.props;
  //   const { username } = user;
  //   if (isLogged) {
  //     return <nav className="navbar navbar-light bg-light">
  //       <ul  className="navbar-nav">
  //         <li className="nav-link">username: { username }</li>
  //         <li className="nav-link" onClick={logout}>Logout</li>
  //       </ul>
  //     </nav>
  //   } else {
  //     return <nav className="navbar navbar-light bg-light">
  //       <ul className="navbar-nav">
  //         <li className="nav-link"><Link to='/'>Login</Link></li>
  //         <li className="nav-link"><Link to='/signup'>Signup</Link></li>
  //       </ul> 
  //     </nav>
  //   }
  // }

  render(){
    const { isLogged, user, logout } = this.props;
    const { username } = user;

    return(
    <nav className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light" id="sidebar">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="index.html">
            <img src="https://dashkit.goodthemes.co/assets/img/logo.svg" className="navbar-brand-img mx-auto" alt="..." />
          </a>
          <div className="navbar-user d-md-none">
            <div className="dropdown">        
              <a href="/#" id="sidebarIcon" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div className="avatar avatar-sm avatar-online">
                  <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg" className="avatar-img rounded-circle" alt="..." />
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="sidebarIcon">
                <a href="profile-posts.html" className="dropdown-item">Profile</a>
                <a href="settings.html" className="dropdown-item">Company</a>
                <hr className="dropdown-divider" />
                <a href="sign-in.html" onClick={logout} className="dropdown-item">Logout</a>
              </div>
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
              <li className="nav-item">
                <Link to="/company" className="nav-link ">
                  <IconBriefcase size={25} className="pr-2"/> Company
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/teams" className="nav-link">
                  <IconGrid size={25} className="pr-2"/> Teams <span className="badge badge-soft-success ml-auto">soon</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link">
                  <IconSettings size={25} className="pr-2"/> Settings
                </Link>
              </li>
              <li className="nav-item">
                <a href="/#" className="nav-link" onClick={logout}>
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