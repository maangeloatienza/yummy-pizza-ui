import axios from 'axios';
import {getToken} from './Commons';

export default axios.create({
    baseURL: "https://mighty-retreat-58606.herokuapp.com/api/v1/",
    // baseURL: "http://localhost:8000/api/v1/",
    headers : {
      'Authorization' : `${getToken()}`
    },
    responseType: "json"
  });