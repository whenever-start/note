const classList = {
  has(element: HTMLElement, str: string) {
    const reg = new RegExp(`\\s${str}`)
    return reg.test(element.className)
  },
  add(element: HTMLElement, str: string) {
    if (this.has(element, str)) {
      return
    }
    element.className += ' ' + str
  },
  remove(element: HTMLElement, str: string) {
    if (!this.has(element, str)) {
      return
    }
    const reg = new RegExp(`\\s${str}`)
    element.className = element.className.replace(reg, '')
  },
  toggle(element: HTMLElement, str: string) {
    this.has(element, str) ? this.remove(element, str) : this.add(element, str)
  }
}

export default classList
