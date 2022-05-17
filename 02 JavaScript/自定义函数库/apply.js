function apply(fn, context, args) {
  if (['', null, undefined].some((value) => context === value)) {
    context = globalThis
  }

  context.temp = fn
  let result = context.temp(...args)
  delete context.temp
  return result
}

// 测试
console.log(apply(Math.max, null, [3, 2, 4, 10]))
