const sharedCSS = require('../shared.css')
const localCSS = require('./style.css')

export default class Button extends HTMLElement {
  constructor() {
    super()

    const shadowDOM = this.attachShadow({ mode: 'closed' })

    const container = document.createElement('div')
    const button = document.createElement('button')
    button.append(document.createElement('slot'))
    container.append(button)

    const css = document.createElement('style')
    css.textContent = sharedCSS + localCSS

    shadowDOM.appendChild(container)
    shadowDOM.appendChild(css)
  }
}
