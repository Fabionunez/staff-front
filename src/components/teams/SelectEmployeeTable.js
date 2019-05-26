import React from 'react'
import SelectEmployeeItem from './SelectEmployeeItem';
import IconSearch from 'react-feather/dist/icons/search';


export default function SelectEmployeeTable(props) {
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
        <div className="card-body pr-0 pl-0">
          <ul className="list-group list-group-flush list my-n3">   
          {
            filteredArray.map(employees => <SelectEmployeeItem 
                                              {...employees} 
                                              getAllEmployees={props.getAllEmployees} 
                                              updateSelectEmployees={props.updateSelectEmployees}
                                              checkOrNot={props.checkOrNot}
                                               />)
          }
          { filteredArray.length === 0 ? "No employees found": ""}
          </ul>
        </div>
      </div>
  )
}
