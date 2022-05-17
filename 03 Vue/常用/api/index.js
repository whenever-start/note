/**
 * 生成接口，并将接口挂载到vue的原型上
 */

import Vue from 'vue'
import request from './request'
import { apiUrl } from './apiUrl'

const api = {}

Object.entries(apiUrl).forEach((item) => {
  api[item[0]] = function (options = {}) {
    return request(
      Object.assign(
        {
          url: item[1]
        },
        options
      )
    )
  }
})

// 将api挂载到vue的原型上
// 业务中引用的方法：this.$api.接口名（小驼峰）
Object.defineProperty(Vue.prototype, '$api', {
  value: api
})

export default api
