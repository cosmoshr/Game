const overlayStyle = require('./overlay.css')
const overlayHtml = require('./overlay.html').default

export default class Overlay {
  constructor() {
    this.isOpen = false
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'overlay')
    this.el.innerHTML = overlayHtml
    const style = document.createElement('style')
    style.textContent = overlayStyle

    this.el.prepend(style)

    document.body.appendChild(this.el)

    this.el.style.visibility = 'hidden'

    this.el.querySelector('#backToGame').onclick = this.launch.bind(this)
    this.el.querySelector('#quit').onclick = this.quit.bind(this)
  }

  quit() {
    this.el.style.visibility = 'hidden'
    this.quitGame()
  }

  launch() {
    if (this.isOpen) {
      this.close()
      this.isOpen = 0
      this.el.style.visibility = 'hidden'
    } else {
      this.open()
      this.isOpen = 1
      this.el.style.visibility = 'visible'
    }
  }

  pressed(key) {
    if (key.key === 'Escape') this.launch()
  }
}
