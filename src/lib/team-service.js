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




  teamView(id) {
    return this.auth.get(`/team/view/${id}`)
    .then(response => response.data)

  }

  
  teamUpdate(user) {


    const {
      id, 
      name,
      usersIds,
      teamLeaderid,
      companyId,
      mission,
      vision
     } = user;

     

    return this.auth.put(`/team/edit`, {
      id,       
      name,
      usersIds,
      teamLeaderid,
      companyId,
      mission,
      vision })
    .then(response => response.data)

  }





  teamDelete(id) {
    return this.auth.delete(`/team/delete/${id}`)
    .then(response => response.data)

  }



}

const teamService = new TeamService();

export default teamService;
