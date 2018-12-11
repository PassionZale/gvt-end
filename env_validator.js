var CONF = require("./src/utils/env");

function confError(msg) {
  this.message = msg || "未知的错误类型";
  this.name = "ENV VALIDATOR ERROR"
}

// TODO 更细化的错误校验

if(!CONF.USER_LOGIN_API_URL) {
  throw new confError("用户登录 API URL 未配置!");
}

if(!CONF.USER_INFO_API_URL) {
  throw new confError("用户信息 API URL 未配置!");
}

if(!CONF.APP_CODE_LIST.length) {
  throw new confError("子系统 APP CODE LIST 未配置");
}