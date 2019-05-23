import React from 'react'
import {Link} from 'react-router-dom';
import IconDelete from 'react-feather/dist/icons/trash-2';



export default function EmployeeItem(props) {


  return (
      <li className="list-group-item px-0" key={props.id}>         
          <div className="row align-items-center">
            <div className="col-auto">
              <a href="profile-posts.html" class="avatar">
                <img src={props.imageUrl} alt="..." class="avatar-img rounded-circle" />
              </a>
            </div>
            <div className="col ml-n2">
              <h4 className="mb-1 name">
                <Link className="stretched-link" to={`/employee/edit/${props._id}`} > {props.name} {props.surname}</Link>
              </h4>
              <p className="small mb-0">
                {props.title} 
              </p> 
            </div>
            {(props.userCanDelete() && !props.isAdmin) ? <div className="col-auto">
              <a className="btn btn-sm btn-white" href="javascript:;" onClick={ () => props.handleDeleting(props._id)} title="Delete employee"  >
                <IconDelete color="grey" size={15} />
              </a>
            </div> : ""}
            
          </div>
        </li>
  )
}

