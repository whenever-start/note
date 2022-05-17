class Swiper {
  constructor(targetSelector, options) {
    this.element = document.querySelector(targetSelector)
    this.options = options

    this.nextBtn = this.element.querySelector(this.options.btn.nextBtn)
    this.prevBtn = this.element.querySelector(this.options.btn.prevBtn)
    this.indicator = this.element.querySelector(this.options.indicator.el)
    this.sliders = this.element.querySelectorAll(this.options.sliders.selector)
    this.slider = this.element.querySelector(this.options.slider.el)
    this.dots = this.indicator.querySelectorAll(this.options.indicator.child)

    this.sliderWidth = this.sliders[0].clientWidth
    this.translateX = -this.sliderWidth
    this.activeIndex = 0
    this.timer = null
    this.total = (this.sliders.length + 1) * this.sliderWidth

    this.goNext = throttle(this.next, 400).bind(this)
    this.goPrev = throttle(this.prev, 400).bind(this)
  }

  init() {
    const beforeInsert = document.createElement('div')
    beforeInsert.innerHTML = this.sliders[this.sliders.length - 1].innerHTML
    beforeInsert.className = 'thumb'

    const appendInsert = document.createElement('div')
    appendInsert.innerHTML = this.sliders[0].innerHTML
    appendInsert.className = 'thumb'

    this.slider.append(appendInsert)
    this.slider.prepend(beforeInsert)

    this.slide()
    this.nextBtn.addEventListener('click', this.goNext)
    this.prevBtn.addEventListener('click', this.goPrev)

    // autoplay
    if (this.options.autoplay) {
      this.autoplay()
    }
  }

  slide() {
    css(this.slider, 'transform', `translateX(${this.translateX}px)`)
  }

  toggleDotStyle() {
    this.dots[this.activeIndex].classList.toggle('active')
  }

  next() {
    clearInterval(this.timer)
    this.toggleDotStyle()

    this.translateX -= this.sliderWidth
    this.activeIndex =
      this.activeIndex < this.sliders.length - 1 ? this.activeIndex + 1 : 0
    if (Math.abs(this.translateX) === this.total) {
      this.change()
    }

    this.slide()
    this.toggleDotStyle()
    this.autoplay()
  }

  prev() {
    clearInterval(this.timer)
    this.toggleDotStyle()

    this.activeIndex =
      this.activeIndex > 0 ? this.activeIndex - 1 : this.sliders.length - 1
    this.translateX += this.sliderWidth
    if (this.translateX === 0) {
      this.change(false)
    }

    this.slide()
    this.toggleDotStyle()
    this.autoplay()
  }

  change(isNext = true) {
    setTimeout(() => {
      css(this.slider, 'transition', 'all 0s')
      this.translateX = isNext
        ? -this.sliderWidth
        : -this.total + this.sliderWidth
      this.slide()
    }, 300)
    setTimeout(() => {
      css(this.slider, 'transition', 'all 0.3s')
    }, 320)
  }

  autoplay() {
    this.timer = setInterval(() => {
      this.next()
    }, 3000)
  }
}

const mySwiper = new Swiper('.swiper-wrap .swiper', {
  autoplay: true,
  btn: {
    prevBtn: '.swiper-btn.btn-left',
    nextBtn: '.swiper-btn.btn-right'
  },
  indicator: {
    el: '.swiper-indicator',
    child: '.dot',
    active: 'active'
  },
  sliders: {
    selector: '.non-break-row .thumb'
  },
  slider: {
    el: '.non-break-row'
  }
})

mySwiper.init()

/** *********************** 分割线 *********************** */

function css(element, prop, value) {
  if (arguments.length === 2) {
    return element.currentStyle
      ? parseFloat(currentStyle[prop])
      : parseFloat(getComputedStyle(element, null)[prop])
  } else if (arguments.length === 3) {
    element.style[prop] = value
  }
}

function throttle(fn, duration = delay) {
  let prev = 0
  return function (...args) {
    let now = new Date().getTime()
    if (now - prev > duration) {
      fn.apply(this, args)
      prev = now
    }
  }
}
