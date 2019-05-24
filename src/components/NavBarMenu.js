import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import IconUsers from 'react-feather/dist/icons/users';
import IconBriefcase from 'react-feather/dist/icons/briefcase';
import IconGrid from 'react-feather/dist/icons/grid';
import IconSettings from 'react-feather/dist/icons/settings';
import IconLogout from 'react-feather/dist/icons/log-out';
import IconStats from 'react-feather/dist/icons/pie-chart';

class NavBarMenu extends Component{


  render(){

    const pathname = this.props.pathname;
    const {user, logout } = this.props;
    //console.log(this.props.clickMenuItem)
  return (
    <div className={this.props.classMenu} id="sidebarCollapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link onClick={this.props.clickMenuItem} className={pathname === "/employees" ? "nav-link active" : "nav-link"} to="/employees" role="button" aria-expanded="true" aria-controls="sidebarDashboards">
                  <IconUsers size={25} className="pr-2"/> Employees
                </Link>
              </li>
              {user.isAdmin ? <li className="nav-item">
                <Link onClick={this.props.clickMenuItem} to="/company" className={pathname === "/company" ? "nav-link active" : "nav-link"}>
                  <IconBriefcase size={25} className="pr-2"/> Company
                </Link>
              </li> : ""}
              
              {user.isAdmin ? 
              <li className="nav-item">
                <Link onClick={this.props.clickMenuItem} to="/teams" className={pathname === "/teams" ? "nav-link active" : "nav-link"}>
                  <IconGrid size={25} className="pr-2"/> Teams <span className="badge badge-soft-success ml-auto">soon</span>
                </Link>
              </li>
              : ""}

              {user.isAdmin ?
              <li className="nav-item">
                <Link onClick={this.props.clickMenuItem} to="/stats" className={pathname === "/stats" ? "nav-link active" : "nav-link"}>
                  <IconStats size={25} className="pr-2"/> Stats <span className="badge badge-soft-success ml-auto">soon</span>
                </Link>
              </li>
              : ""}

              <li className="nav-item">
                <Link onClick={this.props.clickMenuItem} to={`/employee/edit/${user._id}`} className={pathname === `/employee/edit/${user._id}` ? "nav-link active" : "nav-link"}>
                  <IconSettings size={25} className="pr-2"/> Settings
                </Link>
              </li>
              <li onClick={this.props.clickMenuItem} className="nav-item">
                <a href="javascript:;" className="nav-link" onClick={logout}>
                  <IconLogout size={25} className="pr-2"/> Logout
                </a>
              </li>
            </ul>
          </div>
  )
}
}

export default NavBarMenu;