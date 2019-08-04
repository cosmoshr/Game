import { Container, Graphics } from 'pixi.js'
import bus from './bus'

class LocationPicker extends Container {
  active = false

  constructor(color, startPos) {
    super()

    this.interactive = true

    this.color = color
    this.startPos = startPos

    this.circle = new Graphics()
    this.circle.lineStyle(5, color)
    this.circle.drawCircle(0, 0, 100)
    this.circle.endFill()
    this.addChild(this.circle)

    this.line = new Graphics()
    this.addChild(this.line)
  }

  mouseMove(m) {
    const { x, y } = m.data.getLocalPosition(this)

    this.moveData = m.data

    this.circle.position.x = x
    this.circle.position.y = y

    this.line.clear()
    this.line.moveTo(this.startPos.x, this.startPos.y)
    this.line.lineTo(x, y)

    this.mouse = {
      x,
      y
    }
  }

  click() {
    this.active = false

    this.alpha = 0

    this.done(this.moveData)

    this.destroy()
  }
}

export default class PixiOverlays extends Container {
  constructor() {
    super()

    bus.on('getCords', () => this.getCords())
  }

  click(m) {
    if (this.locPicker && this.locPicker.click) this.locPicker.click(m)
  }

  mouseMove(m) {
    if (this.locPicker && this.locPicker.mouseMove) this.locPicker.mouseMove(m)
  }

  getCords() {
    bus.once('activeEntity', e => {
      const { x, y } = e.position
      this.locPicker = new LocationPicker(0xFF0000, { x, y })
      this.locPicker.done = data => {
        bus.emit('returnCords', data.getLocalPosition(e.parent))

        delete this.locPicker
      }

      this.addChild(this.locPicker)
    })

    bus.emit('getActiveEntity')
    bus.emit('getActiveEntity')
  }
}
