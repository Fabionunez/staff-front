import React from 'react'
import IconSearch from 'react-feather/dist/icons/search';
import EmployeeItem from './EmployeeItem';


export default function UserTable(props) {
  const filteredArray = props.employees.filter( employee => {
    return (employee.name + ' ' + employee.surname).toLowerCase().includes(props.keyword.toLowerCase())
  })

  return (
    <div className="card">
              <div className="card-header">
                <form>
                  <div className="input-group input-group-flush input-group-merge">
                    <input id="search-employees" onChange={props.updateKeyword} type="search" className="form-control form-control-prepended search" placeholder="Search" />
                    <div className="input-group-prepend">
                      <div className="input-group-text">
                        <IconSearch size={18} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-body pl-0 pr-0">
                <ul className="list-group list-group-flush list my-n3">   
                {
                  filteredArray.map(employee => <EmployeeItem  
                                                  key={props._id}
                                                  name={employee.name}
                                                  surname={employee.surname}
                                                  title={employee.title}
                                                  idItem={employee._id}
                                                  sessionId={props._id}
                                                  imageUrl={employee.imageUrl}
                                                  isItenAdmin={employee.isAdmin}
                                                  isAdmin={props.isAdmin}
                                                  handleDeleting={props.handleDeleting}  
                                                  getAllEmployees={props.getAllEmployees}
                                                  userCanDelete={props.userCanDelete}
                                                    />)
                }
                {filteredArray.length === 0 ? "No employees found": ""}
                </ul>
              </div>
            </div>
  )
}
