import axios from "axios";
const API = import.meta.env.VITE_APP_BASE_API

export const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 1500,
});

// request.get('satuan')
// .then(res => console.log('data',res.data.rows))
// .catch(e => console.error(e))