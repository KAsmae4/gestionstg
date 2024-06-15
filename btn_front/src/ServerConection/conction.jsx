
import axios from "axios";

const Conncetion = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  
})

// axiosClient.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = 'Bearer ' + token
//   }
//   return config
// })

export {Conncetion}


























































