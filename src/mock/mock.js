/*
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'
import { resultSuccess } from '@/mock/_utils'
import { isFunction } from '@/utils/is'
// 引入所有的mock/api中的文件 匹配所有以.ts结尾的文件，但不包括文件名包含"resInfo"的文件
const modules = import.meta.glob('@/mock/api/**/!(*resInfo).js')
let mock
/**
 * @description: 初始化mock
 * @param axiosInstance
 * @param delayResponse
 */
export function initMock(axiosInstance, delayResponse = 1000) {
  // 注册所有modules中的mock
  mock = new MockAdapter(axiosInstance, { delayResponse })
  Object.keys(modules).forEach((key) => modules[key]())
  return mock
}

/**
 * @description: 使用mock
 */
export function useMock() {
  if (!mock) {
    throw new Error('Mock not initialized')
  } else {
    return mock
  }
}

/**
 * @description: 使用mock onAny
 */
export function useMockOnAny() {
  if (!mock) {
    throw new Error('Mock not initialized')
  } else {
    return (url, dataOrCallback) => {
      // 判断dataOrCallback是否是函数
      if (isFunction(dataOrCallback)) {
        return mock?.onAny(url).reply((config) => {
          const data = dataOrCallback(config)
          return new Promise((resolve) => {
            resolve([200, resultSuccess(data)])
          })
        })
      } else {
        const data = dataOrCallback
        return mock?.onAny(url).reply(() => {
          return new Promise((resolve) => {
            resolve([200, resultSuccess(data)])
          })
        })
      }
    }
  }
}
/**
 * @description: 使用Mock来模拟数据
 * @param data
 */
export function constructMockData(data){
  return Mock.mock(data)
}
