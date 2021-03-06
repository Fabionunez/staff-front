import React from 'react'
import TeamItem from './TeamItem';


export default function UserTable(props) {
  // const filteredArray = props.team.filter( employee => {
  //   return (employee.name + ' ' + employee.surname).toLowerCase().includes(props.keyword.toLowerCase())
  // })


  return (
      <div className="card">
        <div className="card-body pl-0 pr-0">
          <ul className="list-group list-group-flush list my-n3">   
          {
            props.teams.map(team => <TeamItem 
                                      {...team}
                                      key={team._id} 
                                      isAdmin={props.isAdmin}
                                      handleDeleting={props.handleDeleting}  
                                      getAllTeams={props.getAllTeams}
                                      userCanDelete={props.userCanDelete}
                                      
                                        />)
          }
          {/* { props.teams.length === 0 ? <p className="text-center pt-5 text-muted">No teams found </p>: ""} */}
          </ul>
        </div>
      </div>
  )
}
