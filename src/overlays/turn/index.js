import Overlay from '../OverlayBase'

const css = require('./overlay.css')
const html = require('./overlay.html').default

export default class extends Overlay {
  constructor() {
    super(html, css, 'turn-overlay', document.body)
  }
}
