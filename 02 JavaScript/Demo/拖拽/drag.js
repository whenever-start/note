function drag(target) {
  let isDown = false
  let screenX
  let screenY
  let pos

  function moveStart(event) {
    isDown = true
    // 记录 target 位置信息 x y
    pos = getPos(target)
    screenX = event.screenX
    screenY = event.screenY
  }
  function move(event) {
    if (!isDown) {
      return
    }
    // 记录鼠标移动距离
    let deltaX = event.screenX - screenX
    let deltaY = event.screenY - screenY
    // target 移动相同距离

    let left = deltaX + pos.x
    let top = deltaY + pos.y

    left =
      left < 0
        ? 0
        : left > window.innerWidth - target.offsetWidth
        ? window.innerWidth - target.offsetWidth
        : left
    top =
      top < 0
        ? 0
        : top > window.innerHeight - target.offsetHeight
        ? window.innerHeight - target.offsetHeight
        : top

    target.style.left = left + 'px'
    target.style.top = top + 'px'
  }
  function moveEnd(event) {
    isDown = false
    screenX = event.screenX
    screenY = event.screenY
  }

  function getPos(element) {
    let x = 0
    let y = 0
    while (element !== null) {
      x += element.offsetLeft
      y += element.offsetTop
      element = element.offsetParent
    }
    return { x, y }
  }

  target.addEventListener('mousedown', moveStart)
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', moveEnd)
}
