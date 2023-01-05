import axios from "axios";
// const API = import.meta.env.VITE_APP_BASE_API;

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 2000,
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

// request.get('satuan')
// .then(res => console.log('data',res.data.rows))
// .catch(e => console.error(e))