import { Loader, Sprite } from 'pixi.js'

export default class extends Sprite {
  constructor(x, y, type, size) {
    const assetName = `Planets_${type}`
    super(Loader.shared.resources[assetName].texture)

    this.width = size
    this.height = size

    this.x = x
    this.y = y
  }
}
