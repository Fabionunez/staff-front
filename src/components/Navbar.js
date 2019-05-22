import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return <nav className="navbar navbar-light bg-light">
        <ul  className="navbar-nav">
          <li className="nav-link">username: { username }</li>
          <li className="nav-link" onClick={logout}>Logout</li>
        </ul>
      </nav>
    } else {
      return <nav className="navbar navbar-light bg-light">
        <ul className="navbar-nav">
          <li className="nav-link"><Link to='/'>Login</Link></li>
          <li className="nav-link"><Link to='/signup'>Signup</Link></li>
        </ul> 
      </nav>
    }
  
  }
}

export default withAuth(Navbar);