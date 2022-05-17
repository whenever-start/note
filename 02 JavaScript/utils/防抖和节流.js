/**
 * vue 中使用
 * <div class="refresh-btn" @click="refresh"></div>
 * import { throttle } from '@/util';
 * methods: {
 *    refresh: throttle(function (e) {...},delay)
 * }
 */

export function throttle(fn, delay) {
  let prev = 0

  return function () {
    const _this = this
    const arg = arguments
    const now = new Date().getTime()

    if (now - prev > delay) {
      prev = now
      fn.apply(_this, arg)
    }
  }
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 首次点击立即执行
function debounceImmediate(fn, delay) {
  let timer = null
  let prev = 0
  return function (...args) {
    const now = Date.now()
    if (now - prev < delay) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    } else {
      fn.apply(this, args)
    }
    prev = now
  }
}
