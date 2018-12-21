import http from "@/utils/http"
import { USER_LOGIN_API_URL, USER_INFO_API_URL } from "@/utils/env"

/**
 * 用户登录
 * 
 * @param {object} data 
 * 
 * {username, password}
 */
export function login(data = {}) {
  return http({
    method: "post",
    url: USER_LOGIN_API_URL,
    data
  })
}

/**
 * 拉取用户数据
 */
export function fetchUser() {
  return http({
    method: "get",
    url: USER_INFO_API_URL
  })
}