const userAgent = window.navigator.userAgent
let isSafari =
  userAgent.indexOf('Chrome') === -1 && userAgent.indexOf('Safari') >= 0
function standardizedWheel(e) {
  let wheelEvent = Object.assign({}, e)
  // vertical
  if (typeof e.wheelDeltaY !== 'undefined') {
    // webkit
    wheelEvent.deltaY = e.wheelDeltaY / 120
  } else if (
    typeof e.VERTICAL_AXIS !== 'undefined' &&
    e.axis === e.VERTICAL_AXIS
  ) {
    // Firefox < 17
    wheelEvent.deltaY = -e.detail / 3
  }

  // horizental
  if (typeof e.wheelDeltaX !== 'undefined') {
    // webkit
    if (isSafari) {
      wheelEvent.deltaX = -(e.wheelDeltaX / 120)
    } else {
      wheelEvent.deltaX = e.wheelDeltaX / 120
    }
  } else if (
    typeof e.HORIZONTAL_AXIS !== 'undefined' &&
    e2.axis === e2.HORIZONTAL_AXIS
  ) {
    // Firefox < 17
    wheelEvent.deltaX = -e.detail / 3
  }

  if (wheelEvent.deltaY === 0 && wheelEvent.deltaX === 0 && e.wheelDelta) {
    // IE
    wheelEvent.deltaY = e.wheelDelta / 120
  }
  return wheelEvent
}
