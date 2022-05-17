/**
 * 输出介于[a,b]之间的num
 * @param {Number} num 目标数字
 * @param {Number} a 最小值
 * @param {Number} b 最大值
 * @returns 介于[a,b]之间的数字
 */
function numInRange(num, a, b) {
  if (num < a) {
    return a
  } else if (num > b) {
    return b
  } else {
    return num
  }
}
