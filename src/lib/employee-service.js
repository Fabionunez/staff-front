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
    const { name, surname, username, password } = user;
    return this.auth.post('/employee/add', { name, surname, username, password })
      .then(({ data }) => data);
  }

  employeeView(id) {
    return this.auth.get(`/employee/edit/${id}`)
    .then(response => response.data)
  
  }


}

const employeeService = new EmployeeService();

export default employeeService;
