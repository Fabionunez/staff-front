import React from 'react'
import {Link} from 'react-router-dom';
import IconDelete from 'react-feather/dist/icons/trash-2';
import IconAdmin from 'react-feather/dist/icons/star';
import ReactTooltip from 'react-tooltip'



export default function EmployeeItem(props) {




  const linkDestination = (idItem) =>{

    if(props.isAdmin){
      return true

    }else{
      if(idItem === props.sessionId){
        return true
      }else{
        return false
      }
    }
  }



  return (
      <li className="list-group-item px-0" key={props.idItem}>
        <ReactTooltip className='custom-tooltip' />
         
          <div className="row align-items-center">
            <div className="col-auto ml-4">
              <Link to={linkDestination(props.idItem) ? `/employee/edit/${props.idItem}`: `/employee/view/${props.idItem}`} className="avatar">
                <img src={props.imageUrl} alt="..." className="avatar-img rounded-circle" />
                {props.isItenAdmin ?<div className="adminBadge" data-tip="Administrator"><IconAdmin size={22} color="white" className="adminBadgeIcon" /></div> :""}
              </Link>
            </div>
           
            <div className="col ml-n2">
              <h4 className="mb-1 name">
                <Link className="stretched-link" to={linkDestination(props.idItem) ? `/employee/edit/${props.idItem}`: `/employee/view/${props.idItem}`} > {props.name} {props.surname}</Link>
              </h4>
              <p className="small mb-0">
                {props.title}
              </p> 
            </div>
            {(props.userCanDelete() && !props.isItenAdmin) ? <div className="col-auto pr-5">
              <a className="btn btn-sm btn-white" href="javascript:;" onClick={ () => props.handleDeleting(props.idItem)} title="Delete employee"  >
                <IconDelete color="grey" size={15} />
              </a>
            </div> : ""}
            
          </div>
        </li>
  )
}

