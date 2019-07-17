import { Graphics } from 'pixi.js'

export default class Background extends Graphics {
  constructor() {
    super()
    this.beginFill(0x000010)
    this.drawRect(-100000, -100000, 200000, 200000)
    this.endFill()
    this.alpha = 1
  }
}
