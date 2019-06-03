const loaderStyle = require('./style.css')

export default class LinearLoader extends HTMLElement {
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
