import React from 'react'
import TeamItem from './TeamItem';


export default function UserTable(props) {
  // const filteredArray = props.team.filter( employee => {
  //   return (employee.name + ' ' + employee.surname).toLowerCase().includes(props.keyword.toLowerCase())
  // })


  return (
      <div className="card">
        <div className="card-body">
          <ul className="list-group list-group-flush list my-n3">   
          {
            props.teams.map(team => <TeamItem 
                                      {...team} 
                                      isAdmin={props.isAdmin}
                                      handleDeleting={props.handleDeleting}  
                                      getAllTeams={props.getAllTeams}
                                      userCanDelete={props.userCanDelete}
                                      
                                        />)
          }
          { props.teams.length === 0 ? "No teams found": ""}
          </ul>
        </div>
      </div>
  )
}
