// 用户登录 API URL, excute domain!
const USER_LOGIN_API_URL = "/login";

// 用户信息 API URL, excute domain!
const USER_INFO_API_URL = "/ums/auth/getUserRelateData";

// 子系统 APP CODE LIST
const APP_CODE_LIST = ["eos-gvt-liu-control", "gvt-eos-liu-merchant", "eos-gvt-liu-orderpost", "eos-gvt-liu-distribution", "eos-gvt-liu-substitute", "gvt-eos-liu-purchase", "eos-gvt-liu"];

// webpack-dev-server port
const WEBPACK_DEV_SERVER_PORT = 9000;

// webpack-dev-server proxy target
const WEBPACK_DEV_SERVER_PROXY_TARGET = "http://192.168.1.195:8081/eos/";

// service for api baseURL
let backend;
switch (process.env.NODE_ENV) {
  case "release":
    backend = "http://192.168.1.195:8081/eos/";
    break;
  case "production":
    backend = "http://192.168.1.195:8081/eos/";
    break;
  default:
    backend = "/api";
}

// FRONTEND_DOMAIN module
const FRONTEND_DOMAIN = `http://localhost:${WEBPACK_DEV_SERVER_PORT}/#`;

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
  WEBPACK_DEV_SERVER_PORT,
  WEBPACK_DEV_SERVER_PROXY_TARGET,
  ENV
}
