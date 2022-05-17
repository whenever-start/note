// 等差数列
// 解法1: 递归
function sumTo(n) {
  return n === 1 ? n : n + sumTo(n - 1)
}

// 解法2: 循环
function sumTo(n) {
  let sum = 0
  for (let i = 0; i <= n; i++) {
    sum += i
  }
  return sum
}

// 解法3: 公式
function sumTo(n) {
  return (n * (n + 1)) / 2
}

console.log(sumTo(100))
