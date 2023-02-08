import axios from "axios";

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
});

request.interceptors.request.use(function (config) {
  const token = localStorage.getItem("user");
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
  } else {
    config.headers.Authorization = "";
  }
  return config;
});
