import { Container, Graphics } from 'pixi.js'
import bus from './bus'

class LocationPicker extends Container {
  active = false

  constructor(color, startPos) {
    super()

    this.interactive = true

    this.color = color
    this.startPos = startPos

    // this.circle = new Graphics()
    // this.circle.beginFill(color)
    // this.circle.drawCircle(0, 0, 32)
    // this.circle.endFill()
    // this.addChild(this.circle)

    this.line = new Graphics()
    this.addChild(this.line)
  }

  mouseMove(m) {
    if (this.active) {
      const { x, y } = m.data.global

      // this.circle.x = x
      // this.circle.y = y

      this.line.clear()
      this.line.moveTo(this.startPos.x, this.startPos.y)
      this.line.lineTo(x, y)

      this.mouse = {
        x,
        y
      }
    }
  }

  click(m) {
    this.active = false

    const { x, y } = m.data.global

    this.alpha = 0

    this.done(x, y)

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
    bus.emit('getActiveEntityPos')
    bus.once('activeEntityPos', (x, y) => {
      this.locPicker = new LocationPicker(0xFF0000, { x, y })
      this.locPicker.done = (xa, ya) => bus.emit('returnCords', xa, ya)

      this.addChild(this.locPicker)
    })
  }
}
