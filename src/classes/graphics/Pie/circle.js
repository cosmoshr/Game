import { Graphics } from 'pixi.js'
import PieMask from './mask'

export default class PieCircle extends Graphics {
  /**
   * Create a circle with the pie mask
   * @param {Number} x The x coordinate
   * @param {Number} y The y coordinate
   * @param {Numver} r The radius
   * @param {Hex} color The color
   * @param {Numver} angle The amount of the pie that is being covered (360°)
   */
  constructor(x, y, r, angle = 90, color = 0xFFFFFF) {
    super()

    this.pos = {
      x,
      y,
      r,
      c: color,
      a: angle
    }

    this.mask = new PieMask(x, y, r, angle)

    this.color = color
  }

  set color(color) {
    this.pos.c = color
    this.update()
  }

  /**
   * A wraper for the masks update function
   */
  update() {
    this.mask.update()

    this.clear()
    this.beginFill(this.pos.c)
    this.drawCircle(this.pos.x, this.pos.y, this.pos.r)
    this.endFill()
  }

  /** Wraper for this.mask.x */
  set x(x) {
    this.pos.x = x
    this.update()
    this.mask.x = x
  }

  /** Wraper for this.mask.y */
  set y(y) {
    this.pos.y = y
    this.update()
    this.mask.y = y
  }

  /** Wraper for this.mask.r */
  set radius(r) {
    this.pos.r = r
    this.update()
    this.mask.r = r
  }

  /** Wraper for this.mask.a */
  set angle(a) {
    this.pos.a = a
    this.update()
    this.mask.a = a
  }
}
