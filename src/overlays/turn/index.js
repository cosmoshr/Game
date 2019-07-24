import Overlay from '../OverlayBase'

const css = require('./overlay.css')
const html = require('./overlay.html').default

export default class Turn extends Overlay {
  constructor() {
    super(html, css, 'turn-overlay', document.body)

    this.button = document.getElementById('next-turn-button')
    this.button.onclick = this.nextTurn.bind(this)
  }

  async nextTurn() {
    this.button.setAttribute('style', 'filter: brightness(0.5);')

    await this.turn()

    this.button.setAttribute('style', '')
  }
}
