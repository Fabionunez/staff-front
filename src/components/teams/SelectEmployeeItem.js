
import React from 'react';

export default function SelectEmployeeItem(props) {

  // console.log(props.usersIds);
  
  // function selectAndChangeStyle(id){

  //   console.log(id)
  //   const check = document.getElementById(id).checked;
  //   if(check){
  //     document.getElementById(id).checked = false;
  //     document.getElementById("li-"+id).classList.remove("itemSelected");
  //   }else{
  //     document.getElementById(id).checked = true;
  //     document.getElementById("li-"+id).classList.add("itemSelected");
  //   }
  // }

  return (
      <li id={`li-${props._id}`} onClick={() => props.updateSelectEmployees(props._id)}   className={props.usersIds.filter((id) => id.includes(props._id)).length === 1 ? "list-group-item px-0 itemSelected" : "list-group-item px-0" }>         
          <div className="row align-items-center">

            <div className="col-auto ml-4">
             <input
              checked={props.usersIds.filter((id) => id.includes(props._id)).length === 1 ? "checked" : null }
              onChange={() => props.updateSelectEmployees(props._id)} 
              type="checkbox" 
              className="selectedEmployees" 
              value={props._id} 
              id={props._id} />
            </div>
            <div className="col-auto">
              <span className="avatar">
                <img src={props.imageUrl} alt="..." className="avatar-img rounded-circle" />
              </span>
            </div>

            <div className="col ml-n2">
              <h4 className="mb-1 name">
              {props.name} {props.surname} 
              </h4>
              <p className="small mb-0">
                {props.title}
              </p> 
            </div>
            
          </div>
        </li>
  )
}


