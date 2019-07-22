import OverlayBase from '../OverlayBase'

const overlayStyle = require('./overlay.css')
const overlayHtml = require('./overlay.html').default

export default class Overlay extends OverlayBase {
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
      this.close()
      this.el.style.visibility = 'hidden'
      this.isOpen = 0
    } else {
      this.open()
      this.el.style.visibility = 'visible'
      this.isOpen = 1
    }
  }

  pressed(key) {
    if (key.key === 'Escape') this.launch()
    if (key.key === 'Backspace') key.preventDefault()
  }
}
