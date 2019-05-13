import { Sprite, Texture } from 'pixi.js'

export default class extends Sprite {
  constructor(planet) {
    const texture = Texture.from('/assets/img/planets/Habitital_Planet.png')
    super(texture)

    this.width = planet.size
    this.height = planet.size

    this.x = planet.path
    this.y = planet.path
    this.position.x = this.x
    this.position.y = this.y
  }
}
