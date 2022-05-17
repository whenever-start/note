function tooltip(target, options) {
  // TODO 完成配置
  // 默认配置
  const defaults = {
    direction: 'bottom',
    duration: 200,
    space: 15
  }

  const params = Object.assign({}, defaults, options)

  const triggerElt = target.querySelector('.card-main')
  const promptElt = target.querySelector('.card-prompt')
  let onHover = false

  show(triggerElt)
  none(triggerElt)
  show(promptElt)
  none(promptElt)

  function setStyle() {
    const direction = params.direction
    // 要设置的属性: left top transform
    let left
    let top
    let transform = ''
    switch (direction) {
      case 'bottom':
        top = triggerElt.offsetHeight + params.space
        left = '50%'
        transform = 'translateX(-50%)'
        break

      case 'top':
        top = -(promptElt.offsetHeight + params.space)
        left = '50%'
        transform = 'translateX(-50%)'
        break

      case 'left':
        left = -(promptElt.offsetWidth + params.space)
        top = '50%'
        transform = 'translateY(-50%)'
        console.log('left:', left, top)
        break

      case 'right':
        left = triggerElt.offsetWidth + params.space
        top = '50%'
        transform = 'translateY(-50%)'
        break

      default:
        break
    }

    if (direction === 'bottom' || direction === 'top') {
      css(promptElt, 'top', top + 'px')
      css(promptElt, 'left', left)
    }
    if (direction === 'left' || direction === 'right') {
      css(promptElt, 'left', left + 'px')
      css(promptElt, 'top', top)
    }
    css(promptElt, 'transform', transform)
  }

  function show(element) {
    element.addEventListener('mouseenter', function () {
      onHover = true
      promptElt.style.display = 'block'
      setStyle()
    })
  }

  function none(element) {
    element.addEventListener('mouseout', function () {
      onHover = false
      setTimeout(() => {
        if (!onHover) {
          promptElt.style.display = 'none'
        }
      }, params.duration)
    })
  }
}
