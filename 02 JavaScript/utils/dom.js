/**
 * 移除元素
 * @param {Node} el node 节点
 */
export function removeNode(el) {
  const parent = el.parentNode

  if (parent) {
    parent.removeChild(el)
  }
}

/**
 * 返回滚动的距离 scrollTop
 * @param {Node} el ScrollElement
 * @returns scrollTop
 */
export function getScrollTop(el) {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset
}

/**
 * 获取元素属性值
 * eg: getStyle(element, 'width')
 * @param {Element} element 元素
 * @param {String} prop 属性字符串
 * @returns 带单位的属性值(字符串)
 */
function getStyle(element, prop) {
  return element.currentStyle
    ? currentStyle[prop]
    : getComputedStyle(element, null)[prop]
}

/**
 * 获取(2个参数)或设定(3个参数)元素属性值
 * 注意: 传递 value 时要带单位
 * eg: css(element, 'width')
 * eg: css(element, 'width', '100px')
 * @param {Element} element 元素
 * @param {Sting} prop 属性字符串
 * @param {Sting} value 带单位的属性值 可选
 * @returns 只有 2 个参数时, 返回带单位的属性值.
 */
function css(element, prop, value) {
  if (arguments.length === 2) {
    return element.currentStyle
      ? currentStyle[prop]
      : getComputedStyle(element, null)[prop]
  } else if (arguments.length === 3) {
    element.style[prop] = value
  }
}
