// 用户登录 API URL, excute domain!
const USER_LOGIN_API_URL = "";

// 用户信息 API URL, excute domain!
const USER_INFO_API_URL = "";

// 子系统 APP CODE LIST
const APP_CODE_LIST = [];

// service for sidebar mock data
let frontend;

// service for api baseURL
let backend;

switch (process.env.NODE_ENV) {
  case "release":
    // options
    frontend = "";
    // required
    backend = "";
    break;
  case "production":
    // options
    frontend = "";
    // required
    backend = "";
    break;
  default:
    // required
    frontend = "";
    // required
    backend = "";
}

// FRONTEND_DOMAIN module
const FRONTEND_DOMAIN = frontend;

// BACKEND_DOMAIN module
const BACKEND_DOMAIN = backend;

// ENV module
const ENV = process.env.NODE_ENV;

module.exports = {
  USER_LOGIN_API_URL,
  USER_INFO_API_URL,
  APP_CODE_LIST,
  FRONTEND_DOMAIN,
  BACKEND_DOMAIN,
  ENV
}
