import { Sprite, Loader } from 'pixi.js'
import bus from '../bus'

export default class Star extends Sprite {
  constructor(size) {
    super(Loader.shared.resources.sun.texture)

    this.x = -size / 2
    this.y = -size / 2

    this.width = size
    this.height = size

    bus.emit('init', size)
  }
}
