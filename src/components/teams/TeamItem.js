import React from 'react'
import {Link} from 'react-router-dom';
import IconDelete from 'react-feather/dist/icons/trash-2';
import ReactTooltip from 'react-tooltip'



export default function TeamItem(props) {

  return (
      <li className="list-group-item px-0">         
          <div className="row align-items-center">

            <div className="col-auto ml-4 pr-0 d-flex justify-content-end"  style={{minWidth: '100px'}}>
              <ReactTooltip className='custom-tooltip' />
              <div className="avatar-group">
              {props.usersIds.slice(0, 3).map((user) => <span key={`team-member-${user.name}`} className="avatar avatar-xs" data-tip={`${user.name}`}>
                  <img src={user.imageUrl} className="avatar-img rounded-circle" alt="..." />
                </span>)}
              {props.usersIds.length > 3 ? <div className="avatar avatar-xs"><Link style={{"fontSize":"11px"}}  to={`/teams/edit/${props._id}`} data-tip={`And ${props.usersIds.length - 3} more`} className="avatar-title rounded-circle">+{props.usersIds.length - 3}</Link></div> : "" }
              </div>
            </div>

            <div className="col">
              <h4 className="mb-1 name">
                <Link className="stretched-link" to={`/teams/edit/${props._id}`}>{props.name}</Link>
              </h4>
            </div>

            {(props.userCanDelete() && !props.isItenAdmin) ? <div className="col-auto mr-4">
              <button className="btn btn-sm btn-white" onClick={ () => props.handleDeleting(props._id)} title="Delete employee"  >
                <IconDelete color="grey" size={15} />
              </button>
            </div> : ""}

            
          </div>
        </li>
  )
}

