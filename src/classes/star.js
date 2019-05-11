import { Loader, Sprite } from 'pixi.js'

export default class extends Sprite {
  constructor(x, y, type, size, id) {
    const assetName = `Stars_${type}`
    super(Loader.shared.resources[assetName].texture)

    this.id = id

    this.width = size
    this.height = size

    this.x = x
    this.y = y
  }
}
