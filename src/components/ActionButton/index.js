const localCSS = require('./style.css')

export default class ActionButton extends HTMLElement {
  constructor() {
    super()

    const shadowDOM = this.attachShadow({ mode: 'closed' })

    const container = document.createElement('div')
    container.setAttribute('class', 'button-container')
    const button = document.createElement('button')
    button.append(document.createElement('slot'))
    container.append(button)

    const css = document.createElement('style')
    css.textContent = localCSS

    shadowDOM.appendChild(container)
    shadowDOM.appendChild(css)
  }
}
