import axios from 'axios';
// import Employees from '../pages/Employees';

class TeamService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  teamList(){
    return this.auth.get('/team/list')
    .then(response => response.data)
  }




  teamAdd(team) {
    const { 
      name,
      usersIds,
      teamLeaderid,
      companyId,
      mission,
      vision
      } = team;

    return this.auth.post('/team/new', { 
      name,
      usersIds,
      teamLeaderid,
      companyId,
      mission,
      vision
     })
      .then(({ data }) => data);
  }




  // teamView(id) {
  //   return this.auth.get(`/team/view/${id}`)
  //   .then(response => response.data)

  // }

  
  // teamUpdate(user) {
  //   const {
  //     id, 
  //     username,
  //     password,
  //     name,
  //     surname,
  //     title,
  //     companyPhone,
  //     dateStart,
  //     birthDate,
  //     gender,
  //     nationality,
  //     phone,
  //     identificationNumber,
  //     socialSecurityNumber,
  //     address,
  //     city,
  //     postalCode,
  //     province,
  //     country,
  //     emergencyContact,
  //     emergencyPhone,
  //     managerID
  //    } = user;

  //    if(user.imageUrl ===""){
  //     user.imageUrl = "https://res.cloudinary.com/fabionunez/image/upload/v1558806598/staff/user2_e4pwrt.svg";
  //   }
  //   return this.auth.put(`/employee/edit`, {      
  //     id, 
  //     username,
  //     password,
  //     name,
  //     surname,
  //     title,
  //     companyPhone,
  //     dateStart,
  //     birthDate,
  //     gender,
  //     nationality,
  //     phone,
  //     identificationNumber,
  //     socialSecurityNumber,
  //     address,
  //     city,
  //     postalCode,
  //     province,
  //     country,
  //     emergencyContact,
  //     emergencyPhone,
  //     managerID,
  //     imageUrl: user.imageUrl })
  //   .then(response => response.data)

  // }

  teamDelete(id) {
    return this.auth.delete(`/team/delete/${id}`)
    .then(response => response.data)

  }



}

const teamService = new TeamService();

export default teamService;
