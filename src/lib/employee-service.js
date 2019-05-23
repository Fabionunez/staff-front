import axios from 'axios';
// import Employees from '../pages/Employees';

class EmployeeService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  employeesList(){
    return this.auth.get('/employee')
    .then(response => response.data)
  }



  employeeAdd(user) {
    const { name, surname, title, username, password } = user;
    return this.auth.post('/employee/add', { name, surname, title, username, password })
      .then(({ data }) => data);
  }

  employeeView(id) {
    return this.auth.get(`/employee/edit/${id}`)
    .then(response => response.data)

  }

  
  employeeUpdate(user) {
    const { id, name, surname, title, username, password } = user;
    return this.auth.put(`/employee/edit`, {id, name, surname, title, username, password })
    .then(response => response.data)

  }

  employeeDelete(id) {
    return this.auth.delete(`/employee/delete/${id}`)
    .then(response => response.data)

  }


}

const employeeService = new EmployeeService();

export default employeeService;
