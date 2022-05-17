/**
 * 是否数字
 * @param {Sting} val
 * @returns Boolean
 */
export function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val)
}

/**
 *
 * @param {Number} val
 * @returns
 */
export function isNaN(val) {
  if (Number.isNaN) {
    return Number.isNaN(val)
  }

  // eslint-disable-next-line no-self-compare
  return val !== val
}

/**
 * 检验是否是非 Null 和 undefined (已定义)
 * @param {*} val
 * @returns
 */
export function isDef(val) {
  return val !== undefined && val !== null
}

/**
 * 检验是否为函数
 * @param {*} val
 * @returns
 */
export function isFunction(val) {
  return typeof val === 'function'
}

/**
 * 检验是否为对象(非 null)
 * @param {*} val
 * @returns
 */
export function isObject(val) {
  return val !== null && typeof val === 'object'
}

/**
 * 检验是否为 Promise
 * @param {*} val
 * @returns
 */
export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
