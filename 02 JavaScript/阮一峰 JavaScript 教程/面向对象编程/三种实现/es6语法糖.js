class Button {
  constructor(element) {
    this.element = element
  }

  set(styles) {
    css(this.element, styles)
  }
  setText(label) {
    this.element.innerHTML = label
  }
  init(label, styles) {
    this.setText(label)
    this.set(styles)
  }

  addEvent(type, handle) {
    this.element.addEventListener(type, handle)
  }
}

/** *********************** 分割线 ********************** */

class RoundButton extends Button {
  constructor(element) {
    super(element)
  }

  set(styles) {
    super.set(styles)
    this.element.style.borderRadius = '999px'
  }
}

/** *********************** 分割线 ********************** */

class CircleButton extends Button {
  constructor(element) {
    super(element)
  }

  set(size, styles) {
    super.set(styles)
    css(this.element, {
      width: size,
      height: size,
      borderRadius: '50%'
    })
  }

  setText(label) {
    super.setText(label)
  }

  init(label, size, styles) {
    this.setText(label)
    this.set(size, styles)
  }
}

/** *********************** 分割线 ********************** */

function css(element, styles) {
  Object.keys(styles).forEach((key) => {
    element.style[key] = styles[key]
  })
}
