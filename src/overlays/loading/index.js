const loaderStyle = require('./loader.css')
const loadingScreenHtml = require('./loader.html').default

export default class LoadingOverlay {
  constructor() {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'loadingScreen')
    this.el.innerHTML = loadingScreenHtml
    const style = document.createElement('style')
    this.reason = this.el.querySelector('#reason').innerHTML
    style.textContent = loaderStyle

    this.el.prepend(style)

    document.body.appendChild(this.el)
  }

  set message(message) {
    this.el.style.display = 'visible'
    this.reason = message
  }

  hide() {
    this.el.style.display = 'none'
  }
}
