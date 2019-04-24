
// 用户登录 API URL, excute domain!
const USER_LOGIN_API_URL = "/auth/login";

// 用户信息 API URL, excute domain!
const USER_INFO_API_URL = "/auth/getUserRelateData";

// webpack-dev-server host
const WEBPACK_DEV_SERVER_HOST = "localhost";

// webpack-dev-server port
const WEBPACK_DEV_SERVER_PORT = 9090;

// webpack-dev-server proxy target
const WEBPACK_DEV_SERVER_PROXY_TARGET = "http://192.168.1.133:18001";

// axios timeout
const TIMEOUT = 10000;

// axios baseURL
let backend;
switch (process.env.NODE_ENV) {
  // 测试环境
  case "sit":
    backend = "http://192.168.1.133:18001";
    break;
  // 生产环境
  case "production":
    backend = "http://ums.astraea.com.au/ums";
    break;
  // 本地开发
  default:
    backend = "/api";
}

// FRONTEND_DOMAIN module for mock data @ development
const FRONTEND_DOMAIN = `http://${WEBPACK_DEV_SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}/#`

// BACKEND_DOMAIN module
const BACKEND_DOMAIN = backend;

// ENV module
const ENV = process.env.NODE_ENV;

module.exports = {
  USER_LOGIN_API_URL,
  USER_INFO_API_URL,
  FRONTEND_DOMAIN,
  BACKEND_DOMAIN,
  WEBPACK_DEV_SERVER_HOST,
  WEBPACK_DEV_SERVER_PORT,
  WEBPACK_DEV_SERVER_PROXY_TARGET,
  ENV,
  TIMEOUT
}
