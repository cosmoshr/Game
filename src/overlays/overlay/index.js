import Overlay from '../OverlayBase'

const overlayStyle = require('./overlay.css')
const overlayHtml = require('./overlay.html').default

export default class extends Overlay {
  constructor() {
    super(overlayHtml, overlayStyle, 'overlay', document.body)

    this.isOpen = false

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
      this.isOpen = 0
      this.el.style.visibility = 'hidden'
    } else {
      this.isOpen = 1
      this.el.style.visibility = 'visible'
    }
  }

  pressed(key) {
    if (key.key === 'Escape') this.launch()
  }
}
