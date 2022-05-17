function tabs(target, options) {
  if (!target) return

  const defaults = {}

  const params = Object.assign({}, options, defaults)

  const navList = params.navList
  const contentList = params.contentList

  // 1. 生成 dom 元素并插入 target 中
  // 2. 功能
  // 2.1 鼠标切换
  // 2.1.1 tab content 样式切换
  // 2.1.2 content 内容切换

  target.innerHTML = `
    <div class="tab-nav"></div>
    <div class="tab-content"></div>
  `

  // 1
  const data = [
    {
      label: '精选热菜',
      pics: [
        'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114',
        'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114',
        'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114'
      ]
    },
    {
      label: '精选套餐',
      pics: [
        'http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114',
        'http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114',
        'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114'
      ]
    },
    {
      label: '果拼果汁',
      pics: [
        'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114',
        'http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114',
        'http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114'
      ]
    }
  ]

  const tabNavElt = target.querySelector('.tab-nav')
  const tabContentElt = target.querySelector('.tab-content')

  // nav
  let navTemplate = data.reduce((acc, item) => {
    return acc + `<span class="nav-item">${item.label}</span>`
  }, '')

  // content
  let contentTemplate = data.reduce((acc, item) => {
    let subTemplate = item.pics.reduce((subAcc, subItem) => {
      return (
        subAcc +
        `
        <li class="list-item">
          <img src="${subItem}">
        </li>
      `
      )
    }, '')
    let indicatorInner = item.pics.reduce((subAcc) => {
      return subAcc + `<span></span>`
    }, '')
    return (
      acc +
      `
      <div class="box-list">
        <ul class="list">
          ${subTemplate}
        </ul>
        <div class="indicator">${indicatorInner}</div>
        <button class="tab-btn prev">&lt;</button>
        <button class="tab-btn next">&gt;</button>
      </div>
    `
    )
  }, '')
  tabNavElt.innerHTML = navTemplate
  tabContentElt.innerHTML = contentTemplate

  // 2
  const navItemsElt = target.querySelectorAll('.tab-nav .nav-item')
  const contentItemsElt = target.querySelectorAll('.tab-content .box-list')
  let activeIndex = 0

  // 默认样式
  navItemsElt[activeIndex].classList.add('active')
  contentItemsElt[activeIndex].classList.add('active')

  // 选项卡切换
  navItemsElt.forEach((item, index) => {
    item.addEventListener('mouseenter', function () {
      // 样式切换
      navItemsElt[activeIndex].classList.remove('active')
      item.classList.add('active')

      contentItemsElt[activeIndex].classList.remove('active')
      contentItemsElt[index].classList.add('active')

      activeIndex = index
    })
  })

  // 滑动切换
  contentItemsElt.forEach((item) => {
    slide(item)
  })
}

function slide(target) {
  const listElt = target.querySelector('.list')
  const indicatorItemsElt = target.querySelectorAll('.indicator span')
  const next = target.querySelector('.next')
  const prev = target.querySelector('.prev')
  let distance = 400
  let index = 0
  let len = indicatorItemsElt.length

  // 指示器初始化
  indicatorItemsElt[index].classList.add('active')

  next.addEventListener('click', function () {
    if (index < len - 1) {
      indicatorItemsElt[index].classList.remove('active')
      index++
      listElt.style.transform = `translateX(${-index * distance}px)`
      indicatorItemsElt[index].classList.add('active')
    }
  })

  prev.addEventListener('click', function () {
    if (index > 0) {
      indicatorItemsElt[index].classList.remove('active')
      index--
      listElt.style.transform = `translateX(${-index * distance}px)`
      indicatorItemsElt[index].classList.add('active')
    }
  })
}
