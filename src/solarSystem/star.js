import { Sprite, Loader } from 'pixi.js'

export default class Star extends Sprite {
  constructor(size) {
    super(Loader.shared.resources.sun.texture)

    this.x = -size / 2
    this.y = -size / 2

    this.width = size
    this.height = size
  }
}
