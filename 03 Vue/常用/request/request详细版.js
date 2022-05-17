import axios from 'axios'
// 请求进度条
import NProgress from 'nprogress'
// 引入qs模块，用来序列化post类型的数据
import Qs from 'qs'

// 生成实例
const instance = axios.create({
  baseURL: '/',
  timeout: 20000
})

// 请求拦截
instance.interceptors.request.use((config) => {
  // 请求开始时启动进度条
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

  // 处理 post 请求返回的数据
  if (config.method === 'post') {
    const contentType = config.headers['Content-Type']

    // 根据Content-Type转换data格式
    if (contentType) {
      if (contentType.includes('multipart')) {
        // 类型 'multipart/form-data;'
        // config.data = data;
      } else if (contentType.includes('json')) {
        // 类型 'application/json;'
        // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
        config.data = JSON.stringify(config.data)
      } else {
        // 类型 'application/x-www-form-urlencoded;'
        // 服务器收到的raw body(原始数据) name=nowThen&age=18
        config.data = Qs.stringify(config.data)
      }
    }
  }

  return Promise.resolve(config)
})

// 返回拦截
axios.interceptors.response.use(
  (response) => {
    // 请求结束(包括成功和失败)时启动进度条
    NProgress.done()

    // 返回需要的数据
    return response.data
  },
  (error) => {
    // 请求结束(包括成功和失败)时启动进度条
    NProgress.done()
    // 统一处理错误
    console.error(error)

    // 中断 Promise 链(项目请求时不再处理错误)
    // return new Promise(() => {});

    // 项目可以用 catch 处理错误
    return Promise.reject(new Error('请求失败'))
  }
)

// 暴露实例
export default instance
