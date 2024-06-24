

import http from '../http'

/**
 * @description 登录
 * @param data
 */
export function login(data) {
    return http.post(`/admin/system/login`, data)
  }
/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get('/admin/system/info')
}
  /**
 * @description 退出登录
 * @param roleId
 */
export function logout(roleId) {
    return http.get(`/admin/system/logout`,roleId)
  }