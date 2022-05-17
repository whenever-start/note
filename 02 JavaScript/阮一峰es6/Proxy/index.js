const pipe = function (value) {
  var funcStack = []
  var oProxy = new Proxy(
    {},
    {
      get(pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce((val, fn) => {
            return fn(val)
          }, value)
        }
        funcStack.push(window[fnName])
        return oProxy
      }
    }
  )
  return oProxy
}

var double = (n) => n * 2
var pow = (n) => n * n
var reverseInt = (n) => n.toString().split('').reverse().join('') | 0
console.log(pipe(3).double.pow.reverseInt.get)
