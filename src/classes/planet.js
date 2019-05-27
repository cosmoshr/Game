import {
  Sprite, Loader, Container, Graphics
} from 'pixi.js'
import '../functions'

class RoundedRectangle extends Graphics {
  constructor(x, y, width, height, cornerRadius, color, alpha) {
    super()

    this.alpha = alpha
    // this.lineStyle(4, 0x99CCFF, 1)
    this.beginFill(color)
    this.drawRoundedRect(x, y, width, height, cornerRadius)
    this.endFill()
  }
}

class PlanetCenter extends Sprite {
  constructor(planet) {
    const rand = Math.floor(Math.random() * planet.type.default.numberOfTextures)
    const textureName = `Planets_${planet.type.name}_${rand}`

    super(Loader.shared.resources[textureName].texture)

    this.r = planet.path
    this.d = planet.degrees

    this.width = planet.size
    this.height = planet.size
  }
}

// TODO: Write commands to display the info for each planet
class Info extends Container {
  constructor(planet) {
    super()

    this.size = planet.size

    this.outside = new RoundedRectangle(-this.size * 0.5, -this.size * 1.25, this.size * 2, this.size / 2, this.size / 5, 0xFFFFFF, 0.5)
    this.inside = new RoundedRectangle(-this.size * 0.45, -this.size * 1.2, this.size * 1.9, this.size / 2.5, this.size / 5.5, 0xFFFFFF, 1)
    this.addChild(this.outside)
    this.addChild(this.inside)
  }
}

export default class extends Container {
  constructor(planet) {
    super()

    this.r = planet.path
    this.d = planet.degrees

    const pos = Math.genPosOnCircle(0, 0, this.r, this.d)

    this.position.x = pos.x
    this.position.y = pos.y

    this.planet = new PlanetCenter(planet)
    this.addChild(this.planet)

    this.info = new Info(planet)
    this.addChild(this.info)
  }
}
