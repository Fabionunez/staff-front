import React from 'react'
import {Link} from 'react-router-dom';
import IconDelete from 'react-feather/dist/icons/trash-2';



export default function TeamItem(props) {

  console.log(props)

  return (
      <li className="list-group-item px-0" key="{props.idItem}">         
          <div className="row align-items-center">

            <div className="col">
              <h4 className="mb-1 name">
                <Link className="stretched-link" to={`/teams/edit/${props._id}`}>{props.name}</Link>
              </h4>
            </div>

            {(props.userCanDelete() && !props.isItenAdmin) ? <div className="col-auto">
              <a className="btn btn-sm btn-white" href="javascript:;" onClick={ () => props.handleDeleting(props._id)} title="Delete employee"  >
                <IconDelete color="grey" size={15} />
              </a>
            </div> : ""}

            
          </div>
        </li>
  )
}

