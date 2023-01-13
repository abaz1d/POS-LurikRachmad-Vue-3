import axios from "axios";
// const API = import.meta.env.VITE_APP_BASE_API;

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});


request.get('/')
.then(res => console.log('Berhasil Terhubung Database'))
.catch(e => console.log('Gagal Terhubung Database'))