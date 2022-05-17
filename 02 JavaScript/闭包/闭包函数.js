function counterCreator() {
  let index = 1
  return function () {
    return index++
  }
}

const counterA = counterCreator()
counterA()
counterA()
console.log(counterA())
