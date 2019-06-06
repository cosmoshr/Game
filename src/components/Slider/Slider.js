const css = require('./style.css')

export default class Slider extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'closed' })

    this.form = document.createElement('form')

    const style = document.createElement('style')
    style.textContent = css
    this.shadow.append(style)

    this.slider = document.createElement('input')
    this.slider.setAttribute('type', 'range')
    this.slider.setAttribute('min', 0)

    this.form.append(this.slider)

    this.shadow.prepend(this.form)
  }

  /**
   * @param {Number} max
   */
  set max(max) {
    this.slider.setAttribute('max', max)
  }

  /**
   * @param {Number} value
   */
  set value(value) {
    this.slider.value = value
  }

  get value() {
    return this.slider.value
  }
}
