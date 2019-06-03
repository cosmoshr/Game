const loaderStyle = require('./loader.css')
const loadingScreenHtml = require('./loader.html').default

export default class LoadingScreen {
  constructor(reason) {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'loadingScreen')
    this.el.innerHTML = loadingScreenHtml

    const style = document.createElement('style')
    style.textContent = loaderStyle

    this.el.prepend(style)

    this.changeReason(reason)
  }

  get dom() {
    document.getElementById('app').style.display = 'none'
    return this.el
  }

  changeReason(reason) {
    if (reason) this.el.getElementsByClassName('reason')[0].innerHTML = reason
  }

  kill() {
    document.getElementById('app').style.display = 'block'
    this.el.remove()
    delete this
  }
}
