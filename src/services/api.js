import axios from 'axios';
import auth from './auth';

const api = axios.create({
  // baseURL: 'http://192.168.43.205:8080/'   //S9+
    baseURL: 'http://192.168.1.31:8080/' //192.168.15.44:8080/'   //Casa
    // baseURL: 'http://167.172.238.19/'   //servidor
})

api.interceptors.request.use(async config => {
    const token = await auth.token();

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
    
  return config;
});

export default api;

// oficial