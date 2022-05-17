// 斐波那契数

// 动态规划
function fib(n) {
  if (n <= 2) {
    return 1
  }
  let a = 1
  let b = 1
  let c = a + b
  for (let i = 4; i <= n; i++) {
    a = b
    b = c
    c = a + b
  }
  return c
}

// 递归
function fib(n) {
  return n > 2 ? fib(n - 1) + fib(n - 2) : 1
}

// 递归缓存
function fib(n) {
  const cache = {}

  function _fib(n) {
    if (n <= 2) {
      return 1
    }

    if (n in cache) {
      return cache[n]
    }

    return (cache[n] = _fib(n - 1) + _fib(n - 2))
  }

  return _fib(n)
}

// 小结: 递归看起来简洁, 但一旦数字过大, 比如77, 将会消耗大量时间(小时计)和内存. 动态规划其实是递归的反向, 把过程中的每一步计算值都存储了起来, 再用循环方式计算
console.log(fib(1))
console.log(fib(2))
console.log(fib(3))
console.log(fib(7))
console.log(fib(77))
