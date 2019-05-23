import React from 'react'
import { withAuth } from '../providers/AuthProvider';
import {Link} from 'react-router-dom';




function TopBar(props) {
  return (
      <nav className="navbar navbar-expand-md navbar-light d-none d-md-flex" id="topbar">
        <div className="container-fluid d-flex justify-content-end">
            <div className="navbar-user  pr-5">
              <div className="dropdown">
                <Link to={`/employee/edit/${props._id}`} className="avatar avatar-sm dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={props.imageUrl} alt="..." className="avatar-img rounded-circle  mr-2" />
                  {props.name}
                </Link>
                <div className="dropdown-menu dropdown-menu-right">
                  <a href="profile-posts.html" className="dropdown-item">Profile</a>
                  <a href="settings.html" className="dropdown-item">Settings</a>
                  <hr className="dropdown-divider" />
                  <a href="sign-in.html" className="dropdown-item">Logout</a>
                </div>
              </div>
          </div>
        </div>
      </nav>
  )
}

export default withAuth(TopBar);
