/**
 * 获取(2个参数)或设定(3个参数)元素属性值
 * 注意: 传递 value 时要带单位
 * 注意: 非数字如 position: absolute, 或百分比 50% 请用 cssUnit
 * eg: css(element, 'width') => 100(不带单位)
 * eg: css(element, 'width', '100px') 设置时带单位
 * @param {Element} element 元素
 * @param {Sting} prop 属性字符串
 * @param {Sting} value 带单位的属性值 可选
 * @returns 只有 2 个参数时, 返回带单位的属性值.
 */
function css(element, prop, value) {
  // console.log('test:', parseFloat(currentStyle[prop]))
  if (arguments.length === 2) {
    return element.currentStyle
      ? parseFloat(currentStyle[prop])
      : parseFloat(getComputedStyle(element, null)[prop])
  } else if (arguments.length === 3) {
    element.style[prop] = value
  }
}

// 返回值带单位(包括 position: absolute 这样的字符串)
function cssUnit(element, prop) {
  return element.currentStyle
    ? currentStyle[prop]
    : getComputedStyle(element, null)[prop]
}

/**
 * 获取隐藏元素的宽高(display:none)
 * @param {*} element
 * @param {*} prop width, height
 * @returns 宽高(不带单位, 使用 parseFloat)
 */
function cssHide(element, prop) {
  const visibility = cssUnit(element, 'visibility')
  const position = cssUnit(element, 'position')

  css(element, 'visibility', 'hidden')
  css(element, 'position', 'absolute')
  css(element, 'display', 'block')

  const value = css(element, prop)

  css(element, 'visibility', visibility)
  css(element, 'position', position)
  css(element, 'display', 'none')

  return value
}
