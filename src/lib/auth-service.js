import axios from 'axios';
// import Employees from '../pages/Employees';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  signup(user) {
    const { name, surname, corporateName, username, password, imageUrl } = user;
    return this.auth.post('/signup', { name, surname, corporateName, username, password, imageUrl })
      .then(({ data }) => data);
  }

  login(user) {
    const { username, password } = user;
    return this.auth.post('/login', {username, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/logout', {})
      .then(response => response.data)
  }

  me(user) {
    return this.auth.get('/me')
    .then(response => response.data)
  }

}

const authService = new AuthService();

export default authService;
