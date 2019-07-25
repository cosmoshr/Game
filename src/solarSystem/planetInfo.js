import {
  Container, Sprite, Loader, Text, TextStyle
} from 'pixi.js'
import bus from '../bus'
import { PlanetImage } from '../solarSystem.old/info/image'

class Background extends Sprite {
  constructor(whoOwnes) {
    if (whoOwnes === 'Self') {
      super(Loader.shared.resources.your_planet_background.texture)
      this.width = 60
    } else {
      super(Loader.shared.resources.other_planet_background.texture)
      this.width = 45
    }
    this.height = 15
  }
}
class Name extends Text {
  constructor(name, owner) {
    const style = new TextStyle({
      fontFamily: 'Overpass',
      fontSize: 2.5
    })

    super(name, style)

    if (owner !== 'Self') {
      this.position.x = 18
      this.position.y = 6.5
    } else {
      this.position.x = 16.5
      this.position.y = 3.75
    }

    this.resolution = 25
  }
}

export default class PlanetInfo extends Container {
  constructor(planet, index) {
    super()

    this.self = planet

    this.index = index

    bus.on('InHabit', (id, name, owner) => {
      if (id[0] === this.index[0] && id[1] === this.index[1]) {
        this.self.name = name
        this.self.owner = owner
        this.init()
      }
    })

    this.players = {}

    bus.on('start', () => {
      if (planet.habitated) this.init()
    })

    this.x = this.self.width * Math.cos(Math.radians(270))
    this.y = this.self.width * Math.sin(Math.radians(270))
    this.pivot.set(30, 8.5)

    this.cbk = `${this.index[0]}${this.index[1]}`
  }

  init() {
    bus.once(`WhoIsCBK-${this.cbk}`, player => {
      this.player = player

      if (this.player.isMe) {
        this.background = new Background('Self')
        this.nameTag = new Name(this.self.name, 'Self')
      } else {
        this.background = new Background('Other')
        this.nameTag = new Name(this.self.name, 'S')
      }

      this.addChild(this.background)
      this.addChild(this.nameTag)

      const textureName = `Planets_${this.self.type[0]}_${this.self.type[1]}`
      this.addChild(new PlanetImage(textureName))
    })
    bus.emit('WhoIs', this.self.owner, this.cbk)
  }
}
