const sharedCSS = require('../shared.css')
const localCSS = require('./style.css')

const css = sharedCSS + localCSS

export default class Button extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })

    this.container = document.createElement('div')
    this.button = document.createElement('button')
    this.button.append(document.createElement('slot'))
    this.container.append(this.button)

    const style = document.createElement('style')
    style.textContent = css

    this.shadow.appendChild(this.container)
    this.shadow.appendChild(style)
  }
}
