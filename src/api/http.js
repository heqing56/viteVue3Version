import axios from 'axios'

import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/store/modules/user'
import { ResultEnum } from './type'
import { LOGIN_URL } from '@/config/config'
import { RESEETSTORE } from '@/store/reset'
import router from '@/router'
import { initMock } from '@/mock/mock'

export const service = axios.create({
  // 判断环境设置不同的baseURL
  baseURL:
    import.meta.env.NODE_ENV === "development"
      ? import.meta.env.VITE_APP_BASE_API
      : import.meta.env.VITE_APP_BASE_URL,
  timeout: ResultEnum.TIMEOUT ,
});

// 根据配置决定是否使用mock
if (import.meta.env?.VITE_APP_OPEN_MOCK?.toString() === "true") {
  // 初始化mock，axios-mock-adapter
  console.log("初始化mock，axios-mock-adapter");
  initMock(service);
}

/**
 * @description: 请求拦截器
 * @returns {*}
 */
service.interceptors.request.use(
  (config) => {
    const userStore = useTokenStore();
    const token = userStore.token;
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);
/**
 * @description: 响应拦截器
 * @returns {*}
 */
service.interceptors.response.use(
  (response) => {
    const { data } = response;
    // * 登陆失效（code == 203）
    if (data.code === ResultEnum.EXPIRE) {
      RESEETSTORE();
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE);
      router.replace(LOGIN_URL);
      return Promise.reject(data);
    }

    if (data.code && data.code !== ResultEnum.SUCCESS) {
      ElMessage.error(data.message || ResultEnum.ERRMESSAGE);
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      default:
        message = "网络连接故障";
    }

    ElMessage.error(message);
    return Promise.reject(error);
  }
);

/**
 * @description: 导出封装的请求方法
 * @returns {*}
 */
const http = {
  get(
    url,
    params,
    config
  ){
    return service.get(url, { params, ...config });
  },

  post(
    url,
    data,
    config
  ){
    return service.post(url, data, config);
  },
};

export default http;
