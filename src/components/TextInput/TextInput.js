import { MutationComponent } from 'stera'

const sharedCSS = require('../shared.css')
const localCSS = require('./style.css')

const css = sharedCSS + localCSS

export default class TextInput extends MutationComponent {
  get value() {
    return this.text.value
  }

  render() {
    this.container = document.createElement('div')
    this.text = document.createElement('input')
    this.text.setAttribute('type', 'text')
    this.text.setAttribute('placeholder', this.getAttribute('placeholder') || 'An original name')

    this.container.append(this.text)

    const style = document.createElement('style')
    style.textContent = css
    this.container.append(style)

    return this.container
  }
}
