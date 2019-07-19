import { Sprite, Loader } from 'pixi.js'

export default class Star extends Sprite {
  constructor(size) {
    super(Loader.shared.resources.sun.texture)

    this.x = 0
    this.y = 0

    this.width = size
    this.height = size
  }
}
