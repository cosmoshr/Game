import { Loader, Container, Sprite } from 'pixi.js'

// eslint-disable-next-line no-unused-vars
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
    super(Loader.shared.resources.sun.texture)

    this.x = x
    this.y = y
    this.r = r

    this.width = r
    this.height = r
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

    // this.addChild(new Atmosphere())
    this.addChild(new SunCenter(x, y, size))
  }
}
