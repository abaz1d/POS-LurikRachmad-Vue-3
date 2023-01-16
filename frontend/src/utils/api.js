import axios from "axios";
// const API = import.meta.env.VITE_APP_BASE_API;

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 2000,
  // headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  //headers: { 'Authorization': token ? `Bearer ${token}` : '' }
});

request.interceptors.request.use(function (config) {
  const token = localStorage.getItem('user');
  if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
  } else {
      config.headers.Authorization = '';
  }
  return config;
});

request.get('/')
.then(res => console.log('Berhasil Terhubung Database',res))
.catch(e => console.log('Gagal Terhubung Database',e))