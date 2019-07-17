const loaderStyle = require('./loader.css')
const loadingScreenHtml = require('./loader.html').default

export default class LoadingOverlay {
  constructor(percent = false) {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'loadingScreen')
    this.el.innerHTML = loadingScreenHtml
    const style = document.createElement('style')
    this.reason = this.el.querySelector('#reason').innerHTML
    style.textContent = loaderStyle

    this.el.prepend(style)

    document.body.appendChild(this.el)
    if (percent) {
      this.percent = this.el.querySelector('#percent')
      this.percent.style.visibility = 'visible'
    }
  }

  set message(message) {
    this.reason = message
  }

  kill() {
    document.body.removeChild(this.el)
  }

  set value(value) {
    this.percent.innerHTML = `${value.toFixed(2)}%`
  }
}
