const loaderStyle = require('./loader.css')
const loadingScreenHtml = require('./loader.html').default

export class LoadingScreen {
  constructor(reason) {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'this.el')
    this.el.innerHTML = loadingScreenHtml

    const style = document.createElement('style')
    style.textContent = loaderStyle

    this.el.appendChild(style)

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

export class LinearLoader extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })

    this.loader = document.createElement('progress')
    this.loader.setAttribute('max', 100)
    this.loader.setAttribute('class', 'pure-material-progress-linear')

    const style = document.createElement('style')
    style.textContent = loaderStyle

    this.shadow.appendChild(this.loader)
    this.shadow.appendChild(style)

    this.attributeChange()

    const observer = new MutationObserver(this.attributeChange.bind(this))
    observer.observe(this, { attributes: true })
  }

  attributeChange() {
    if (this.hasAttribute('value')) this.loader.setAttribute('value', this.getAttribute('value'))
  }
}
