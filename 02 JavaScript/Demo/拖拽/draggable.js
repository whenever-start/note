/**
 * eg: draggable(element)
 * options: 可选
 * 注意: !!! 必须为定位元素
 * 功能: 使 element 元素可拖拽
 * 拖拽句柄: 配置 handleBar
 * 参考: https://www.zhangxinxu.com/wordpress/2010/03/javascript%e5%ae%9e%e7%8e%b0%e6%9c%80%e7%ae%80%e5%8d%95%e7%9a%84%e6%8b%96%e6%8b%bd%e6%95%88%e6%9e%9c/
 * 参考代码: https://gitee.com/zhangxinxu/zxx-drag/blob/master/zxxDrag.js
 */
function draggable(target, options) {
  if (!target) return

  const defaults = {
    handleBar: target, // 句柄, 默认为目标元素本身
    // 边界, 默认为 window 边界, 其它值为 ele.getBoundingClientRect()
    bounding: {
      left: 0,
      top: 0,
      bottom: window.innerHeight,
      right: Math.min(window.innerWidth, document.documentElement.clientWidth)
    },
    edgeLock: true, // 是否锁定边界
    onMove: function () {}, // 移动时的回调函数
    end() {} // 松开鼠标后的回调函数
  }

  // options
  const params = Object.assign({}, defaults, options)

  // 兼容移动端事件
  const eventType =
    'ontouchstart' in document
      ? {
          start: 'touchstart',
          move: 'touchmove',
          end: 'touchend'
        }
      : {
          start: 'mousedown',
          move: 'mousemove',
          end: 'mouseup'
        }

  // 当前鼠标坐标信息
  const store = {}
  const handleBar = params.handleBar || target
  const bounding = params.bounding
  const targetBounding = target.getBoundingClientRect()

  // start
  handleBar.addEventListener(eventType.start, function (event) {
    // IE 拖拽可能拖不动的处理
    if (!window.WeakMap || typeof document.msHidden != 'undefined') {
      event.preventDefault()
    }
    // 兼顾移动端
    if (event.touches && event.touches.length) {
      event = event.touches[0]
    }

    // 为 store 添加属性
    store.x = event.pageX
    store.y = event.pageY
    store.top = css(target, 'top') || 0
    store.left = css(target, 'left') || 0
    // 判断是否开始移动的 flag
    store.isMoving = true
  })
  // move
  document.addEventListener(
    eventType.move,
    function (event) {
      if (!store.isMoving) return
      // 如果不阻止默认行为
      // 尝试拖动其它div后, 再来拖动本div, 鼠标弹起后还会跟着移动
      event.preventDefault()
      let deltaX = event.pageX - store.x
      let deltaY = event.pageY - store.y
      let targetLeft = store.left + deltaX
      let targetTop = store.top + deltaY

      // 范围
      if (params.edgeLock) {
        targetLeft = numInRange(
          targetLeft,
          bounding.left - targetBounding.left,
          bounding.right - targetBounding.right
        )
        targetTop = numInRange(
          targetTop,
          bounding.top - targetBounding.top,
          bounding.bottom - targetBounding.bottom
        )
      }

      // 样式
      css(target, 'left', targetLeft + 'px')
      css(target, 'top', targetTop + 'px')

      // onMove回调
      params.onMove()
    },
    {
      // passive 为true时不能阻止默认行为
      // Unable to preventDefault inside passive event listener invocation.
      passive: false
    }
  )
  // end
  document.addEventListener(eventType.end, function () {
    if (store.isMoving) {
      store.isMoving = false
      // end回调
      params.end()
    }
  })

  // 键盘控制
  keyControl(target, {
    bounding: params.bounding
  })
}

function keyControl(target, options) {
  const targetBounding = target.getBoundingClientRect()
  const bounding = options.bounding
  const leftKey = 'ArrowLeft'
  const upKey = 'ArrowUp'
  const rightKey = 'ArrowRight'
  const downKey = 'ArrowDown'
  const step = 50

  target.tabIndex = 0
  target.addEventListener('keydown', function (event) {
    let targetLeft = css(target, 'left')
    let targetTop = css(target, 'top')

    switch (event.key) {
      case leftKey:
        targetLeft -= step
        break

      case rightKey:
        targetLeft += step
        break

      case upKey:
        targetTop -= step
        break

      case downKey:
        targetTop += step
        break

      default:
        console.log(event.key)
        break
    }
    targetLeft = numInRange(
      targetLeft,
      bounding.left - targetBounding.left,
      bounding.right - targetBounding.right
    )
    targetTop = numInRange(
      targetTop,
      bounding.top - targetBounding.top,
      bounding.bottom - targetBounding.bottom
    )
    css(target, 'left', targetLeft + 'px')
    css(target, 'top', targetTop + 'px')
  })
}
