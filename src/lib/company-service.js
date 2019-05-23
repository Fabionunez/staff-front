import axios from 'axios';

class CompanyService {
  constructor() {
    this.auth = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  companyUpdate(user) {
    const {tradeName, corporateName, taxIdNumber, address, city, postalCode, province, country} = user;
  
    return this.auth.put(`/company`, {tradeName, corporateName, taxIdNumber, address, city, postalCode, province, country})
    .then(response => response.data)

  }

  companyView(id) {

    return this.auth.get(`/company`)
    .then(response => response.data)

  } 

}

const companyService = new CompanyService();

export default companyService;