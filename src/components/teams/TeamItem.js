import React from 'react'
import {Link} from 'react-router-dom';
import IconDelete from 'react-feather/dist/icons/trash-2';



export default function TeamItem(props) {


  
  console.log(props)

  return (
      <li className="list-group-item px-0" key={props.idItem}>         
          <div className="row align-items-center">

            <div className="col-auto ml-4 pr-0">  
              {/* <div className="avatar-group">
                <a href="profile-posts.html" className="avatar avatar-xs">
                  <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-3.jpg" className="avatar-img rounded-circle" alt="..." />
                </a>
                <a href="profile-posts.html" className="avatar avatar-xs">
                  <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-4.jpg" className="avatar-img rounded-circle" alt="..." />
                </a>
                <a href="profile-posts.html" className="avatar avatar-xs">
                  <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-5.jpg" className="avatar-img rounded-circle" alt="..." />
                </a>
                <div className="avatar avatar-xs">
                  <div className="avatar-title rounded-circle">+7</div>
                </div>
              </div> */}
              {/* <span class="badge badge-soft-primary">{props.usersIds.length} {props.usersIds.length === 1 ? "employee": "employees"}</span> */}
            </div>

            <div className="col">
              <h4 className="mb-1 name">
                <Link className="stretched-link" to={`/teams/edit/${props._id}`}>{props.name}</Link>
              </h4>
            </div>

            {(props.userCanDelete() && !props.isItenAdmin) ? <div className="col-auto mr-4">
              <a className="btn btn-sm btn-white" href="javascript:;" onClick={ () => props.handleDeleting(props._id)} title="Delete employee"  >
                <IconDelete color="grey" size={15} />
              </a>
            </div> : ""}

            
          </div>
        </li>
  )
}

