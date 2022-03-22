/**
 * 用于事件上报公共请求类
 */
import axios from 'axios'
// 根据环境不同引入不同api地址
import constant from './constant'
import { getSign } from './index'
const baseEventApi = process.env.VUE_APP_EVENT_API
// create an axios instance
const service = axios.create({
  baseURL: baseEventApi, // url = base api url + request url
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    config.headers['X-UBT-AppId'] = constant.appId
    config.headers['X-UBT-DeviceId'] = constant.deviceId
    config.headers['X-UBT-Sign'] = getSign()
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

