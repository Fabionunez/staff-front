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
    const { 
      username,
      password,
      name,
      surname,
      title,
      companyPhone,
      dateStart,
      birthDate,
      gender,
      nationality,
      phone,
      identificationNumber,
      socialSecurityNumber,
      address,
      city,
      postalCode,
      province,
      country,
      emergencyContact,
      emergencyPhone,
      managerID
    } = user;

    if(user.imageUrl ===""){
      user.imageUrl = "https://res.cloudinary.com/fabionunez/image/upload/v1558806598/staff/user2_e4pwrt.svg";
    }
    return this.auth.post('/employee/add', { 
      username,
      password,
      name,
      surname,
      title,
      companyPhone,
      dateStart,
      birthDate,
      gender,
      nationality,
      phone,
      identificationNumber,
      socialSecurityNumber,
      address,
      city,
      postalCode,
      province,
      country,
      emergencyContact,
      emergencyPhone,
      managerID,
      imageUrl: user.imageUrl
     })
      .then(({ data }) => data);
  }

  employeeView(id) {
    return this.auth.get(`/employee/view/${id}`)
    .then(response => response.data)
  }

  employeeViewEdit(id) {
    return this.auth.get(`/employee/edit/${id}`)
    .then(response => response.data)
  }

  
  employeeUpdate(user) {
    const {
      id, 
      username,
      password,
      name,
      surname,
      title,
      companyPhone,
      dateStart,
      birthDate,
      gender,
      nationality,
      phone,
      identificationNumber,
      socialSecurityNumber,
      address,
      city,
      postalCode,
      province,
      country,
      emergencyContact,
      emergencyPhone,
      managerID
     } = user;

     if(user.imageUrl ===""){
      user.imageUrl = "https://res.cloudinary.com/fabionunez/image/upload/v1558806598/staff/user2_e4pwrt.svg";
    }
    return this.auth.put(`/employee/edit`, {      
      id, 
      username,
      password,
      name,
      surname,
      title,
      companyPhone,
      dateStart,
      birthDate,
      gender,
      nationality,
      phone,
      identificationNumber,
      socialSecurityNumber,
      address,
      city,
      postalCode,
      province,
      country,
      emergencyContact,
      emergencyPhone,
      managerID,
      imageUrl: user.imageUrl })
    .then(response => response.data)

  }

  employeeDelete(id) {
    return this.auth.delete(`/employee/delete/${id}`)
    .then(response => response.data)

  }

  imageUpload(file) {
    return this.auth.post('/employee/image', file)
    .then(({data}) => data)
  }

}

const employeeService = new EmployeeService();

export default employeeService;
