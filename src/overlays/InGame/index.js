import bus from '../../bus'

const css = require('./overlay.css')
const html = require('./overlay.html').default

export default class InGame {
  constructor(entities) {
    this.entities = entities
    this.entities.updateActive = () => this.displayEntityActions()

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

    this.entityOverlay = document.getElementById('entity-actions-overlay')
  }

  displayEntityActions() {
    this.entityOverlay.innerHTML = ''

    const { active } = this.entities

    if (active) active.actionDisplay.forEach(action => {
      const actionEl = document.createElement('action-button')
      actionEl.innerHTML = `<img src="${action.icon}" alt="${action.description}" />`

      if (action.passCords) actionEl.onclick = async () => {
        const posData = await new Promise(responce => {
          bus.emit('getCords')
          bus.once('returnCords', data => responce(data))
        })

        const { x, y } = posData

        active.moveTo(x, y)
      }
      else actionEl.onclick = () => active.setAction(action.action)

      this.entityOverlay.appendChild(actionEl)
    })
  }

  kill() {
    this.el.remove()
  }
}
