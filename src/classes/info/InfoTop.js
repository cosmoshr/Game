import { Container, Loader, Sprite } from 'pixi.js'

class Background extends Sprite {
  constructor() {
    super(Loader.shared.resources.unclaimed_planet_background.texture)

    this.width = 36
    this.height = 15
  }
}

export default class InfoTop extends Container {
  constructor(planet) {
    super()

    this.addChild(new Background())

    this.position.x = planet.size / 2 - this.width / 2
    this.position.y = -planet.size / 4
  }
}
