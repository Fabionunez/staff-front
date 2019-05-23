import React from 'react'
import {Link} from 'react-router-dom';
import IconDelete from 'react-feather/dist/icons/trash-2';
import IconAdmin from 'react-feather/dist/icons/star';



export default function EmployeeItem(props) {


  return (
      <li className="list-group-item px-0" key={props.id}>         
          <div className="row align-items-center">
            <div className="col-auto">
              <Link to={`/employee/edit/${props._id}`} className="avatar">
                <img src={props.imageUrl} alt="..." className="avatar-img rounded-circle" />
                {props.isAdmin ?<div className="adminBadge" title="Admin of the account"><IconAdmin size={22} color="white" className="adminBadgeIcon" /></div> :""}
              </Link>
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

