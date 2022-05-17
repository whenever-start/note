/**
 * 快速排序
 * @param {Array} array 目标数组
 * @param {Function} fn 对比函数
 * @returns {Array} 排序后的新数组
 */
const quickSort = (array, fn = (a, b) => a - b) => {
  const len = array.length
  if (len < 2) return array

  const base = array[0]
  const left = []
  const right = []

  for (let i = 1; i < len; i++) {
    const value = array[i]
    // value <= base ? left.push(value) : right.push(value)
    fn(value, base) <= 0 ? left.push(value) : right.push(value)
  }
  return quickSort(left, fn).concat([base], quickSort(right, fn))
}

// 无对比函数
const quickSort = (array) => {
  const len = array.length
  if (len < 2) return array

  const base = array[0]
  const left = []
  const right = []

  for (let i = 1; i < len; i++) {
    const value = array[i]
    value <= base ? left.push(value) : right.push(value)
  }
  return quickSort(left, fn).concat([base], quickSort(right, fn))
}

// 冒泡排序: 最慢
const bubbleSort = (array, fn = (a, b) => a - b) => {
  const len = array.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 1; j < len; j++) {
      if (fn(array[j], array[j - 1]) < 0) {
        let tmp = array[j]
        array[j] = array[j - 1]
        array[j - 1] = tmp
      }
    }
  }
  return array
}

// 插入排序: 很慢
const insertSort = (array) => {
  const arr = [array[0]]
  for (let i = 1; i < array.length; i++) {
    const value = array[i]
    if (value > arr[arr.length - 1]) {
      arr.push(value)
    } else {
      // 从头遍历 insertIndex
      // for (let j = 0; j < arr.length - 1; j++) {
      //   if (value <= arr[j]) {
      //     // 插入
      //     for (let k = arr.length; k > j; k--) {
      //       arr[k] = arr[k - 1]
      //     }
      //     arr[j] = value
      //     break
      //   }
      // }
      // 用二分法寻找 insertIndex
      const insert = getInsert(arr, value)
      for (let j = arr.length; j > insert; j--) {
        arr[j] = arr[j - 1]
      }
      arr[insert] = value
    }
  }
  return arr
}

/**
 * 获取插入序号
 * @param {Array} array 目标数组(已排序)
 * @param {Number} value 目标值
 * @returns {Number} 插入序号
 */
function getInsert(array, value) {
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const midValue = array[mid]
    if (value === midValue) {
      return mid
    } else if (value < midValue) {
      right = mid - 1
    } else if (value > midValue) {
      left = mid + 1
    }
  }
  return left
}
