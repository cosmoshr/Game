import {
  Sprite, Loader, Container, Graphics, Text
} from 'pixi.js'
import '../functions'
import Moon from './moons'
import InfoTop from './info/InfoTop'

class InfoScreen extends Graphics {
  constructor(planet) {
    super()
    this.position.x = this.position.x + planet.size * 2
    this.position.y = this.position.y - planet.size

    this.beginFill(0xFFFFFF)
    this.drawRoundedRect(0, 0, 125, 250, 10)
    this.endFill()

    this.text = new Text(planet.owner, {
      fontFamily: 'Arial', fontSize: 12, fill: 0xff1010
    })
    this.text.x += 5

    const line = new Graphics()
    line.beginFill(0xFF3300)
    line.drawRect(5, 15, 115, 1)
    line.endFill()
    this.addChild(line)
    this.addChild(this.text)
  }
}

class PlanetCenter extends Sprite {
  constructor(planet) {
    const rand = Math.floor(Math.random() * planet.type.numberOfTextures)
    const textureName = `Planets_${planet.type.name}_${rand}`

    super(Loader.shared.resources[textureName].texture)

    this.textureName = textureName

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

    this.infoShort = new InfoTop(planet)

    this.infoScreen = new InfoScreen(planet)
    this.infoScreen.visible = false

    this.infoShort.interactive = true
    this.infoShort.mousedown = () => {
      this.infoScreen.visible = !this.infoScreen.visible
    }


    this.addChild(this.infoShort)
    this.addChild(this.infoScreen)
  }
}

export default class extends Container {
  constructor(planet) {
    super()

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
}
