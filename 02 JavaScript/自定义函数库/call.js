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
// const obj = {
//   c: 10,
//   add(a, b) {
//     return a + b + this.c
//   }
// }
// globalThis.c = 1000

// const obj2 = {
//   c: 100
// }

// function add(a, b) {
//   return a + b + this.c
// }

// console.log(call(obj.add, obj2, 1, 2))
// console.log(call(add, undefined, 1, 2))
// console.log(call(Math.max, null, 3, 2))
