const flatten = (arr: any[]): any[] =>
  arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])

export default flatten
// 如果只有 2 层
function flat(arr: any[]) {
  return [].concat(...arr)
}
