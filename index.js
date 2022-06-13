function addClass(element, classNames) {
  element.className += ' ' + classNames
}

function removeClass(element, str) {
  const reg = new RegExp(`\\s?${str}`)
  let className = element.className
  element.className = className.replace(reg, '')
}

function toggleClass(element, str) {
  const reg = new RegExp(`\\s?${str}`)
  reg.test(element.className)
    ? removeClass(element, str)
    : addClass(element, str)
}

function hasClass(element, str) {
  const reg = new RegExp(`\\s?${str}`)
  return reg.test(element.className)
}
