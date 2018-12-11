import axios from "axios"
import Auth from "./auth"
import { BACKEND_DOMAIN } from "./env"

const http = axios.create({
  baseURL: BACKEND_DOMAIN,
  timeout: 5000
});

http.interceptors.request.use(config => {
  const jwt = Auth.getToken();
  jwt && (config.headers["Authorization"] = jwt);
  return config;
}, error => {
  Promise.reject(error);
});

http.interceptors.response.use(response => {
  const code = response.data.code;
  if (code === "110002" || code === "110003" || code === "110103" || code === "110004") {
    Auth.logOut();
    return;
  }
  return response.data;
}, error => {
  if (error.response) {
    const code = error.response.data.code;
    if (code === "110002" || code === "110003" || code === "110103" || code === "110004") {
      Auth.logOut();
      return;
    }
  }
  return Promise.reject(error);
});

export default http;