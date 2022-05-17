function fn(this: Window, a: number, b: number): number {
  console.log(this)
  return a + b
}
console.log(window.fn(3, 4))
