/**
 * 半自定义:
 * 1. 隐藏浏览器滚动条, 自定义样式
 * 2. 滚动机制还是原生浏览器
 * 3. 滚动(滚轮,键盘,选中文字上/下拉)时同步自定义滚动条滑块
 * 4. 拖动滑块时同步滚动
 */
function customizeScrollbar(target, options) {
  const containerElt = target.querySelector('.scroll-container')

  let containerHeight = css(containerElt, 'height')
  let scrollHeight = containerElt.scrollHeight
  let sliderHeight = (containerHeight * containerHeight) / scrollHeight

  // 1. 隐藏原生滚动条
  const scrollWidth = getScrollbarWidth()
  css(containerElt, 'marginRight', -scrollWidth + 'px')
  css(containerElt, 'overflow', 'auto')

  // 添加自定义滚动条
  const scrollbarElt = document.createElement('div')
  const sliderElt = document.createElement('div')
  scrollbarElt.className = 'scrollbar'
  sliderElt.className = 'slider'
  css(sliderElt, 'height', sliderHeight + 'px')
  containerElt.appendChild(scrollbarElt)
  scrollbarElt.appendChild(sliderElt)

  // 3. 滚动
  containerElt.addEventListener('scroll', function () {
    let scrollTop = containerElt.scrollTop
    let sliderTop = (scrollTop / scrollHeight) * containerHeight
    css(sliderElt, 'top', sliderTop + 'px')
  })

  // 4. slider 拖动
  let isDrag = false
  let startY = 0
  let startTop = 0
  const eventMap = {
    mousedown(event) {
      startY = event.pageY
      startTop = css(sliderElt, 'top')

      // slider 样式
      sliderElt.classList.add('slider--selected')
      css(sliderElt, 'opacity', 1)

      isDrag = true
    },
    mousemove(event) {
      if (!isDrag) return

      let distance = event.pageY - startY
      let top = distance + startTop

      top = numInRange(top, 0, containerHeight - sliderHeight)
      css(sliderElt, 'top', top + 'px')
      containerElt.scrollTo(0, (top / containerHeight) * scrollHeight)
    },
    mouseup() {
      if (!isDrag) return

      // slider 样式
      sliderElt.classList.remove('slider--selected')
      css(sliderElt, 'opacity', '')

      isDrag = false
    }
  }

  sliderElt.addEventListener('mousedown', eventMap.mousedown)
  document.addEventListener('mousemove', eventMap.mousemove)
  document.addEventListener('mouseup', eventMap.mouseup)
}

/**
 * 获取滚动条宽度
 * eg: getScrollbarWidth()
 * @returns 浏览器滚动条宽度, 例如 17.
 */
function getScrollbarWidth() {
  // 生成元素并插入 body
  const outer = document.createElement('div')
  const inner = document.createElement('div')
  document.body.appendChild(outer)
  outer.appendChild(inner)

  const outerStyle = outer.style
  const innerStyle = inner.style

  // 设置元素样式(scroll)
  outerStyle.height = '100px'
  outerStyle.overflow = 'auto'
  outerStyle.width = '100%'

  innerStyle.height = '200px'
  innerStyle.width = '100%'

  // 计算宽度
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  // 移除元素
  outer.removeChild(inner)
  document.body.removeChild(outer)

  return scrollbarWidth
}
