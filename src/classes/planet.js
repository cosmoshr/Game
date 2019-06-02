import {
  Sprite, Loader, Container, Graphics, Text
} from 'pixi.js'
import '../functions'
import Moon from './moons'

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

    this.r = planet.path
    this.d = planet.degrees

    this.width = planet.size
    this.height = planet.size
  }
}

class InfoShort extends Container {
  constructor(planet) {
    super()
    this.position.x = this.position.x - planet.size * 0.1
    this.position.y = this.position.y - planet.size * 0.5
    this.outside = new RoundedRectangle(0, 0, 100, 15, 5, 0xFFFFFF, 0.5)
    this.inside = new RoundedRectangle(1, 1, 98, 13, 5, 0xFFFFFF, 0.5)

    this.text = new Text(planet.owner, {
      fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center'
    })
    this.text.x += 5

    // this.inside = new RoundedRectangle(-size * 0.45, -size * 1.2, size * 1.9, size / 2.5, size / 5.5, 0xFFFFFF, 1)
    this.addChild(this.outside)
    this.addChild(this.inside)
    this.addChild(this.text)
  }
}

// TODO: Write commands to display the info for each planet
class Info extends Container {
  constructor(planet) {
    super()

    this.size = planet.size

    this.infoShort = new InfoShort(planet)

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

    this.addChild(new PlanetCenter(this.self))

    planet.moons.forEach(moon => this.addChild(new Moon(moon)))

    this.addChild(new Info(this.self))
  }
}
