import { Graphics } from 'pixi.js'

export default class Line extends Graphics {
  constructor(width, color, alpha = 1, startx, starty, endx, endy) {
    super()

    this.lineStyle(width, color, alpha)
    this.moveTo(startx, starty)
    this.lineTo(endx, endy)
  }
}
