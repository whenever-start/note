function bubbleSort(nums) {
  const len = nums.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = 1; j < len - i; j++) {
      if (nums[j] < nums[j - 1]) {
        ;[nums[j], nums[j - 1]] = [nums[j - 1], nums[j]]
      }
    }
  }
  return nums
}

function quickSort(nums) {
  const len = nums.length
  if (len < 2) return nums
  const base = nums[0]
  const left = []
  const right = []
  for (let i = 1; i < len; i++) {
    const value = nums[i]
    value <= base ? left.push(value) : right.push(value)
  }
  return quickSort(left).concat(base, quickSort(right))
}

function insertSort(nums) {
  const arr = [nums[0]]
  for (let i = 1, len = nums.length; i < len; i++) {
    const value = nums[i]
    let index = findIndex(arr, value)
    insert(arr, value, index)
  }
  return arr
}

// 1. [index,len] 右移1
// nums[index] = target
function insert(nums, target, index) {
  const len = nums.length
  if (len === 0) return

  for (let i = len; i > index; i--) {
    nums[i] = nums[i - 1]
  }
  nums[index] = target
  return nums
}

// 1. target >= 最后一个 nums.push(target)
// 2. target > num[mid] (mid,right] : [left,mid]
function findIndex(nums, target) {
  let left = 0
  let right = nums.length - 1
  let mid

  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (target === nums[mid]) {
      return mid
    } else if (target > nums[mid]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
}
// console.log(insert([1, 2, 3, 4, 5], 9, 0))
// console.log(findIndex([1, 3, 5, 7, 9], 6))
console.log(insertSort([1, 3, 5, 2, 4, 6, 11, 22, 13, 42, 45, 7, 9]))
