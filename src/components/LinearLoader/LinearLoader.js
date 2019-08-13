const loaderStyle = require('./style.css')

export default class LinearLoader extends HTMLElement {
  constructor() {
    super()

    const shadowDOM = this.attachShadow({ mode: 'closed' })

    this.loader = document.createElement('progress')
    this.loader.setAttribute('max', 100)
    this.loader.setAttribute('class', 'pure-material-progress-linear')

    const css = document.createElement('style')
    css.textContent = loaderStyle

    shadowDOM.appendChild(this.loader)
    shadowDOM.appendChild(css)

    this.attributeChange()

    const observer = new MutationObserver(this.attributeChange.bind(this))
    observer.observe(this, { attributes: true })
  }

  attributeChange() {
    if (this.hasAttribute('value')) this.loader.setAttribute('value', this.getAttribute('value'))
    else if (this.loader.hasAttribute('value')) this.loader.removeAttribute('value')
  }
}
