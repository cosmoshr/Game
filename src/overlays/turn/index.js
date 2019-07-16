const overlayStyle = require('./overlay.css')
const overlayHtml = require('./overlay.html').default

export default class {
  constructor() {
    this.isOpen = false
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'overlay')
    this.el.innerHTML = overlayHtml
    const style = document.createElement('style')
    style.textContent = overlayStyle

    this.el.prepend(style)

    document.body.appendChild(this.el)
  }
}
