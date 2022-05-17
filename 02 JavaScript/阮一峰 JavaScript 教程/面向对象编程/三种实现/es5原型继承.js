function Button(element) {
  this.element = element
}

Button.prototype.set = function (styles) {
  css(this.element, styles)
}

Button.prototype.setText = function (label) {
  this.element.innerHTML = label
}

Button.prototype.init = function (label, styles) {
  this.setText(label)
  this.set(styles)
}

Button.prototype.addEvent = function (type, handle) {
  this.element.addEventListener(type, handle)
}

/** *********************** 分割线 ********************** */

function RoundButton(element) {
  Button.call(this, element)
}

// 继承
RoundButton.prototype = Object.create(Button.prototype)
RoundButton.prototype.constructor = RoundButton

RoundButton.prototype.set = function (styles) {
  Button.prototype.set.call(this, styles)
  this.element.style.borderRadius = '999px'
}

RoundButton.prototype.toString = function () {
  console.log('button')
}

/** *********************** 分割线 ********************** */

function CircleButton(element) {
  Button.call(this, element)
}
CircleButton.prototype = Object.create(Button.prototype)
CircleButton.prototype.constructor = CircleButton

CircleButton.prototype.set = function (size, styles) {
  Button.prototype.set.call(this, styles)
  css(this.element, {
    width: size,
    height: size,
    borderRadius: '50%'
  })
}

CircleButton.prototype.init = function (label, size, styles) {
  Button.prototype.setText.call(this, label)
  this.set(size, styles)
}

/** *********************** 分割线 ********************** */

function css(element, styles) {
  Object.keys(styles).forEach((key) => {
    element.style[key] = styles[key]
  })
}
