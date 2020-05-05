import axios from 'axios';
import {getToken} from './Commons';

export default axios.create({
    baseURL: "52.221.216.10:2408/api/v1/",
    // baseURL: "http://localhost:8000/api/v1/",
    headers : {
      'Authorization' : `${getToken()}`
    },
    responseType: "json"
  });