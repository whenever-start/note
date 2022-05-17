class Swiper {
  constructor(
    target,
    {
      container = '.swiper-container',
      indicator = '.swiper-indicator',
      slider = '.swiper-slider',
      button = {
        prev: '.swiper-btn.prev',
        next: '.swiper-btn.next'
      },
      autoplay = true,
      duration = 2000,
      speed = 300
    } = {}
  ) {
    this.target = target
    this.container = target.querySelector(container)
    this.indicator = target.querySelector(indicator)
    this.prevBtn = target.querySelector(button.prev)
    this.nextBtn = target.querySelector(button.next)
    this.sliders = [...target.querySelectorAll(slider)]
    this.autoplay = autoplay
    this.duration = duration
    this.speed = speed

    this.sliderWidth = parseFloat(getComputedStyle(this.target).width)
    this.len = this.sliders.length
    this.curIndex = 0
    this.translate = -this.sliderWidth
    this.goNext = throttle(this.next.bind(this), this.speed + 500)
    this.goPrev = throttle(this.prev.bind(this), this.speed + 500)
    this.onResize = debounce(this.handleResize.bind(this), 500)
    this.dots = null
  }

  init() {
    // 前后个加一个slider
    this.generateSliders()

    // indicator
    this.generateDots()

    this._setTransition()

    // 绑定事件
    this.nextBtn.addEventListener('click', this.goNext)
    this.prevBtn.addEventListener('click', this.goPrev)
    this.indicator.addEventListener('click', this.go.bind(this))

    this.slide()

    // autoplay
    if (this.autoplay) {
      this.play()
    }

    // resize
    window.addEventListener('resize', this.onResize)
  }

  handleResize() {
    const els = this.target.querySelectorAll('.swiper-slider')
    const clientWidth = this.target.clientWidth
    els.forEach((el) => {
      el.style.width = clientWidth + 'px'
      this.sliderWidth = clientWidth
      this.translate = -this.sliderWidth
      this.curIndex = 0
      setTimeout(() => {
        this.next()
      }, 0)
    })
  }

  generateSliders() {
    const append = this.sliders[0].cloneNode(true)
    const prepend = this.sliders[this.len - 1].cloneNode(true)
    this.container.appendChild(append)
    this.container.prepend(prepend)
  }

  generateDots() {
    for (let i = 0; i < this.len; i++) {
      const dot = document.createElement('span')
      dot.className = 'dot'
      if (i === this.curIndex) {
        dot.className += ' active'
      }
      this.indicator.appendChild(dot)
    }
    this.dots = [...this.indicator.querySelectorAll('.dot')]
  }

  slide() {
    this.container.style.transform = `translateX(${this.translate}px)`

    if (this.autoplay) {
      this.play()
    }
  }

  next() {
    this.dots[this.curIndex].classList.remove('active')
    this.curIndex = indexInLoop(this.curIndex + 1, this.len)
    this.dots[this.curIndex].classList.add('active')
    this.translate -= this.sliderWidth
    this.slide()
    if (this.translate === -(this.len + 1) * this.sliderWidth) {
      setTimeout(() => {
        this.translate = -this.sliderWidth
        this.change()
      }, this.speed + 500)
    }
  }

  prev() {
    this.dots[this.curIndex].classList.remove('active')
    this.curIndex = indexInLoop(this.curIndex - 1, this.len)
    this.dots[this.curIndex].classList.add('active')
    this.translate += this.sliderWidth
    this.slide()
    if (this.translate === 0) {
      setTimeout(() => {
        this.translate = -this.len * this.sliderWidth
        this.change()
      }, this.speed + 500)
    }
  }

  change() {
    // this.container.style.transition = 'transform 0s'
    this._clearTransition()
    this.slide()
    setTimeout(() => {
      // this.container.style.transition = `transform ease-in ${this.speed}ms`
      this._setTransition()
    }, 20)
  }

  go(event) {
    let oldIndex = this.curIndex
    if (event.target.classList.contains('dot')) {
      this.dots[this.curIndex].classList.remove('active')
      this.curIndex = this.dots.findIndex((item) => item === event.target)
      this.translate += -(this.curIndex - oldIndex) * this.sliderWidth
      this.slide()
      this.dots[this.curIndex].classList.add('active')
    }
  }

  play() {
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.next()
    }, this.duration)
  }

  _setTransition() {
    this.container.style.transition = `transform ease-in ${this.speed}ms`
  }

  _clearTransition() {
    this.container.style.transition = 'transform 0s'
  }
}

function throttle(fn, delay) {
  let prev = 0
  return function (...args) {
    let now = new Date().getTime()
    if (now - prev >= delay) {
      fn.apply(this, args)
      prev = now
    }
  }
}

function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearInterval(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function indexInLoop(index, len) {
  return index < 0 ? len + index : index >= len ? index - len : index
}
