/**
 * axios 二次封装
 * 1. 配置基础路径和超时限制
 * 2. 添加进度条信息 nprogress
 * 3. 处理相应数据, 让请求时可以直接拿到data
 * 4. 统一处理请求错误, 具体请求也可以选择处理或不处理
 *
 * 需要安装
 *  cnpm i -S nprogress
 */

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 对 axios 封装, 是创建一个新的实例进行封装
const instance = axios.create({
  // 设置当前项目中, 所有接口的基础路径
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/',
  // 超过时间就会报错(超时)
  timeout: 30000
})

// 请求拦截
instance.interceptors.request.use((config) => {
  NProgress.start()

  // 处理 headers
  config.headers = Object.assign(
    config.method === 'get'
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        }
      : {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
    config.headers
  )

  return Promise.resolve(config)
})

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    NProgress.done()

    return response.data
  },
  (error) => {
    NProgress.done()
    console.error(error.message || '请求错误')

    return Promise.reject(error)
  }
)

export default instance
