function bind(fn, context, ...args) {
  return function (...subArgs) {
    return call(fn, context, ...args, ...subArgs)
  }
}

function call(fn, context, ...rest) {
  if (['', null, undefined].some((value) => context === value)) {
    context = globalThis
  }
  context.temp = fn
  let result = context.temp(...rest)
  delete context.temp
  return result
}

// 测试
// let rs = bind(Math.min, null, 2, 4, 5)
// console.log(rs())
// console.log(rs(1, 3))
