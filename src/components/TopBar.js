import React from 'react'

export default function TopBar() {
  return (
      <nav class="navbar navbar-expand-md navbar-light d-none d-md-flex" id="topbar">
        <div class="container-fluid d-flex justify-content-end">
            <div class="navbar-user  pr-5">
              <div class="dropdown">
                <a href="#" class="avatar avatar-sm dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-5.jpg" alt="..." class="avatar-img rounded-circle  mr-2" />
                  María
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a href="profile-posts.html" class="dropdown-item">Profile</a>
                  <a href="settings.html" class="dropdown-item">Settings</a>
                  <hr class="dropdown-divider" />
                  <a href="sign-in.html" class="dropdown-item">Logout</a>
                </div>
              </div>
          </div>
        </div>
      </nav>
  )
}
