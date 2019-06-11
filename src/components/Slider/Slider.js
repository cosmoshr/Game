const style = require('./style.css')

export default class extends HTMLElement {
  constructor() {
    super()

    const shadowDOM = this.attachShadow({ mode: 'closed' })

    const css = document.createElement('style')
    css.textContent = style
    shadowDOM.append(css)

    const form = document.createElement('form')

    this.slider = document.createElement('input')
    this.slider.setAttribute('type', 'range')
    this.slider.value = 1
    this.slider.setAttribute('min', 1)
    this.slider.setAttribute('max', 10)
    this.slider.setAttribute('step', 0.1)

    form.append(this.slider)
    shadowDOM.prepend(form)
  }

  get value() {
    return this.slider.value
  }

  set value(value) {
    this.slider.value = value
  }
}
