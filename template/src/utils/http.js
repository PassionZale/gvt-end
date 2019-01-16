import axios from "axios"
import Auth from "./auth"
import Lang from "./lang"
import { BACKEND_DOMAIN } from "./env"
import { JWT_EXPIRES_CODE } from "./constants"

const http = axios.create({
  baseURL: BACKEND_DOMAIN,
  timeout: 5000
});

http.defaults.headers.common["Accept-Language"] = Lang.getLang();

http.interceptors.request.use(config => {
  const jwt = Auth.getToken();
  jwt && (config.headers["Authorization"] = jwt);
  return config;
}, error => {
  Promise.reject(error);
});

http.interceptors.response.use(response => {
  const code = response.data.code;

  if(JWT_EXPIRES_CODE.indexOf(code) > -1) {
    return Promise.reject({redirect: "login", msg: "登录过期, 请重新登录!"})
  }

  if(code != 200) {
    return Promise.reject(response.data);
  }

  return response.data;
}, error => {
  return Promise.reject(error);
});

export default http;