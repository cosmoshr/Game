import bus from '../../bus'

const css = require('./overlay.css')
const html = require('./overlay.html').default

export default class Turn {
  constructor() {
    this.el = document.createElement('div')
    this.el.setAttribute('id', 'turn-container')
    this.el.innerHTML = html

    const style = document.createElement('style')
    style.textContent = css

    this.el.prepend(style)

    document.body.appendChild(this.el)

    this.button = document.getElementById('next-turn-button')
    this.button.onclick = () => {
      this.button.setAttribute('style', 'filter: brightness(0.5);')
      bus.emit('next-turn-clicked')
    }

    this.turnCounter = document.getElementById('turn-counter')

    bus.on('next-turn', () => {
      this.button.setAttribute('style', '')
      this.turnCounter.innerText = ++this.turn
    })
    bus.on('start', turn => {
      this.turn = turn
      this.turnCounter.innerText = this.turn
    })
  }

  kill() {
    this.el.remove()
  }
}
