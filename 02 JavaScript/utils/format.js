import { isNumeric, isDef } from './validate'
/**
 *
 * @param {Sting} value
 * @param {Sting} char
 * @param {RegExp} regExp
 * @returns
 */
function trimExtraChar(value, char, regExp) {
  const index = value.indexOf(char)

  if (index === -1) {
    return value
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index)
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

/**
 * 格式化数字
 * @param {Sting} value
 * @param {Boolean} allowDot 是否允许小数点
 * @returns
 */
export function formatNumber(value, allowDot) {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g)
  } else {
    value = value.split('.')[0]
  }

  value = trimExtraChar(value, '-', /-/g)

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g

  return value.replace(regExp, '')
}

/**
 * 添加 px 单位
 * @param {Number|String} value
 * @returns
 */
export function addUnit(value) {
  if (!isDef(value)) {
    return undefined
  }

  value = String(value)
  return isNumeric(value) ? `${value}px` : value
}

/**
 * rem to px
 * @param {Sting} value
 * @returns
 */
function convertRem(value) {
  const rootStyle = window.getComputedStyle(document.documentElement)
  const rootFontSize = parseFloat(rootStyle.fontSize)

  value = value.replace(/rem/g, '')

  return +value * rootFontSize
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
/**
 * camel-case => camelCase
 * @param {String} name
 * @returns
 */
function camelCase(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// firstUpperCase
function firstUpperCase(str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}

/**
 * 格式化时间
 * 注意: 时间戳是以 ms 为单位, 如果是 unix 时间, 需要 *1000 再计算
 * @param {Number} stamp 时间戳
 * @returns 2020-11-11 12:12:12
 */
export function formatFullTime(stamp) {
  const myDate = new Date(stamp)
  const year = myDate.getFullYear()
  const month =
    myDate.getMonth() + 1 < 10
      ? '0' + (myDate.getMonth() + 1)
      : myDate.getMonth() + 1
  const day = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
  const hour =
    myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
  const minutes =
    myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes()
  const seconds =
    myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds()

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}
