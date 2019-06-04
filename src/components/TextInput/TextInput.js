const sharedCSS = require('../shared.css')
const localCSS = require('./style.css')

const css = sharedCSS + localCSS

export default class TextInput extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })

    this.container = document.createElement('div')
    this.text = document.createElement('input')
    this.text.setAttribute('type', 'text')
    this.container.append(this.text)

    const style = document.createElement('style')
    style.textContent = css

    this.shadow.appendChild(this.container)
    this.shadow.appendChild(style)
  }

  get value() {
    return this.text.value
  }
}
