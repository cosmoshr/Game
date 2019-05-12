import { Loader, Container, Sprite } from 'pixi.js'

class Atmosphere extends Sprite {
  constructor(x, y, r) {
    super(Loader.shared.resources.Atmosphere.texture)

    this.r = r

    this.position.x = x
    this.position.y = y

    this.width = 1000
    this.height = 1000
  }
}

class SunCenter extends Sprite {
  constructor(x, y, r) {
    super(Loader.shared.resources.Stars_Sun.texture)

    this.x = x
    this.y = y
    this.r = r
  }
}

export default class extends Container {
  constructor(x, y, size) {
    super()

    this.x = x
    this.y = y
    this.r = size

    this.position.x = x
    this.position.y = y

    this.addChild(new Atmosphere())
    this.addChild(new SunCenter(x, y, size))
  }
}
