
// 用户登录 API URL, excute domain!
const USER_LOGIN_API_URL = "/auth/login";

// 用户信息 API URL, excute domain!
const USER_INFO_API_URL = "/auth/getUserRelateData";

// webpack-dev-server open page
const WEBPACK_OPEN_PAGE = "umsf";

// webpack-dev-server host
const WEBPACK_DEV_SERVER_HOST = "localhost";

// webpack-dev-server port
const WEBPACK_DEV_SERVER_PORT = 9090;

// webpack-dev-server proxy target
const WEBPACK_DEV_SERVER_PROXY_TARGET = "http://192.168.1.134:18001";

// axios timeout
const TIMEOUT = 0;

// axios baseURL
let backend;
switch (process.env.NODE_ENV) {
  // 测试环境
  case "fat":
    backend = "http://192.168.1.116/ums";
    break;
  // 开发环境
  case "dev":
    backend = "http://192.168.1.35/ums";
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
const FRONTEND_DOMAIN = `/${WEBPACK_OPEN_PAGE}#`

// BACKEND_DOMAIN module
const BACKEND_DOMAIN = backend;

// ENV module
const ENV = process.env.NODE_ENV;

module.exports = {
  USER_LOGIN_API_URL,
  USER_INFO_API_URL,
  FRONTEND_DOMAIN,
  BACKEND_DOMAIN,
  WEBPACK_OPEN_PAGE,
  WEBPACK_DEV_SERVER_HOST,
  WEBPACK_DEV_SERVER_PORT,
  WEBPACK_DEV_SERVER_PROXY_TARGET,
  ENV,
  TIMEOUT
}
