

import http from '../http'

/**
 * @description 登录
 * @param data
 */
export function goodsList(data) {
    return http.post(`/admin/goods/list`, data)
  }
