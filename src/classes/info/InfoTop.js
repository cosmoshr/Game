import {
  Container, Loader, Sprite, Text, TextStyle
} from 'pixi.js'
import Line from '../graphics/Line'

class Background extends Sprite {
  constructor() {
    super(Loader.shared.resources.unclaimed_planet_background.texture)

    this.width = 36
    this.height = 15
  }
}

class PlanetImage extends Sprite {
  constructor(textureName) {
    super(Loader.shared.resources[textureName].texture)

    this.width = 12
    this.height = 12

    this.position.x = 1.5
    this.position.y = 1.5
  }
}

class Name extends Text {
  constructor(name) {
    const style = new TextStyle({
      fontFamily: 'Overpass',
      fontSize: 2.5
    })

    super(name, style)

    this.position.x = 18
    this.position.y = 6.5

    this.resolution = 25
  }
}

export default class InfoTop extends Container {
  constructor(planet) {
    super()

    this.addChild(new Background())
    this.addChild(new PlanetImage(planet.texture))
    this.addChild(new Line(0.0375, 0xCECECE, 1, 15.75, 3.75, 15.75, 11.25))
    this.addChild(new Name(planet.name))

    this.position.x = planet.size / 2 - this.width / 2
    this.position.y = -planet.size / 4 - 10
  }
}
