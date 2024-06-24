

import http from '../http'

/**
 * @description 登录
 * @param data
 */
export function userList(data) {
    return http.post(`/admin/user/list`, data)
  }
