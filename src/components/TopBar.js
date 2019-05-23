import React from 'react'

export default function TopBar() {
  return (
      <nav className="navbar navbar-expand-md navbar-light d-none d-md-flex" id="topbar">
        <div className="container-fluid d-flex justify-content-end">
            <div className="navbar-user  pr-5">
              <div className="dropdown">
                <a href="#" className="avatar avatar-sm dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-5.jpg" alt="..." className="avatar-img rounded-circle  mr-2" />
                  María
                </a>
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
