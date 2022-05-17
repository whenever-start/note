function throttle(fn, delay) {
  let prev = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - prev >= delay) {
      fn.apply(this, args)
      prev = now
    }
  }
}

// 第一次是 delay 之后才开始
function throttle(fn, delay) {
  let timer = null
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 1. prev now
// 2. now - prev < delay 属于连续点击 debounce
// 3. >= delay 属于 "第一次" 点击, 先执行 prev = now
function debounce(fn, delay) {
  let prev = 0
  let timer = null
  return function (...args) {
    const now = Date.now()

    // 1.
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

function say() {
  console.log('fn')
}

let fn = debounceImmediate(say, 1000)
