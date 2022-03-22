import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 根据环境不同引入不同api地址
// import { baseApi } from '@/config'
const baseApi = process.env.VUE_APP_API_HOST
// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true
      })
    }
    if (store.getters.token) {
      config.headers['X-Token'] = store.getters.token || ''
    }
    console.log('-0-0--', config)
    return config
  },
  error => {
    // do something with request error
    console.log(error, '===== interceptor request error') // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    // console.log(res, '===== interceptors.response res')
    // if (res.code != undefined && res.code !== 200) {
    //   return Promise.reject(res || 'error')
    // } else if (res.code == 200) {
    //   return Promise.resolve(res)
    // }
    if (res) {
      return Promise.resolve(res)
    } else {
      return Promise.reject(res || 'error')
    }
  },
  error => {
    Toast.clear()
    console.log(error, '===== interceptor response error') // for debug
    return Promise.reject(error)
  }
)

export default service
