import {
  Sprite, Loader, Container
} from 'pixi.js'
import Moon from './moon'
import InfoTop from './info/InfoTop'


class PlanetCenter extends Sprite {
  constructor(planet) {
    const textureName = `Planets_${planet.type.name}_${planet.texture}`

    super(Loader.shared.resources[textureName].texture)

    this.textureName = textureName

    this.r = planet.path
    this.d = planet.degrees

    this.width = planet.size
    this.height = planet.size
  }
}

class Info extends Container {
  constructor(planet) {
    super()

    this.size = planet.size

    this.infoShort = new InfoTop(planet)

    this.infoShort.interactive = true

    this.addChild(this.infoShort)
  }
}

export default class Planet extends Container {
  constructor(planet) {
    super()

    this.index = planet.index

    this.type = planet.type.name
    this.isHabitable = planet.type.name === 'Habitital_Planet'

    this.self = planet
    this.self.owner = 'Nobody'

    this.r = planet.path
    this.d = planet.degrees

    const pos = Math.genPosOnCircle(0, 0, this.r, this.d)

    this.position.x = pos.x
    this.position.y = pos.y

    const planetCenter = new PlanetCenter(this.self)
    this.addChild(planetCenter)
    this.self.texture = planetCenter.textureName

    planet.moons.forEach(moon => this.addChild(new Moon(moon)))

    this.addChild(new Info(this.self))
  }

  turn() {
    return new Promise(r => {
      // eslint-disable-next-line no-console
      console.log(`A promise from planet #${this.index}`)

      r()
    })
  }
}
